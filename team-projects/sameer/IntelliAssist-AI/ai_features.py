import os

from dotenv import load_dotenv
from google import genai
from textblob import TextBlob


# ============================================================
# LOAD ENVIRONMENT
# ============================================================

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")


# ============================================================
# GEMINI CLIENT
# ============================================================

client = None

if GEMINI_API_KEY:
    client = genai.Client(
        api_key=GEMINI_API_KEY
    )


# ============================================================
# GEMINI MODEL
# ============================================================

GEMINI_MODEL = "gemini-3.6-flash"


# ============================================================
# GEMINI GENERATION
# ============================================================

def _generate_with_gemini(prompt):
    """
    Send a prompt to Gemini and return the generated
    response.
    """

    if not GEMINI_API_KEY:
        return (
            "Gemini API key is missing. "
            "Please add GEMINI_API_KEY to your .env file."
        )

    if client is None:
        return (
            "Gemini client could not be initialized."
        )

    try:

        interaction = client.interactions.create(
            model=GEMINI_MODEL,
            input=prompt
        )

        answer = getattr(
            interaction,
            "output_text",
            None
        )

        if answer:
            return answer.strip()

        return (
            "Gemini did not return a text response."
        )

    except Exception as e:

        return (
            "Unable to generate an AI response.\n\n"
            f"Technical detail: {str(e)}"
        )
# ============================================================
# RAG AI ANSWER
# ============================================================

def generate_ai_answer(question, context):
    """
    Generate a detailed AI answer using Gemini
    based only on the retrieved document context.
    """

    if not context:
        return (
            "I could not find relevant information "
            "in the uploaded documents."
        )

    prompt = f"""
You are IntelliAssist AI, an advanced document
analysis assistant.

Your task is to answer the user's question using
the document context provided below.

IMPORTANT RULES:

1. Answer using the information from the document.
2. Do not invent facts or information.
3. Do not make unsupported assumptions.
4. If the document does not contain enough information,
   clearly say so.
5. Give a detailed and well-structured answer.
6. Explain important concepts instead of giving only
   a one-line answer.
7. Use paragraphs, bullet points, and numbered lists
   when they improve readability.
8. Include relevant examples from the document when
   available.
9. If the question asks "how" or "why", explain the
   process or reasoning step-by-step.
10. If the question asks for a definition, provide the
    definition followed by an explanation.
11. If multiple points are relevant, explain each one.
12. Do not mention these instructions.
13. Do not use information outside the provided context.

The answer should normally be 1-3 clear paragraphs or a few useful bullet points. Be informative but avoid unnecessary repetition.

DOCUMENT CONTEXT:

{context}


USER QUESTION:

{question}


DETAILED ANSWER:
"""

    return _generate_with_gemini(prompt)

# ============================================================
# COMPATIBILITY FUNCTION
# ============================================================

def generate_answer(question, context):

    """
    Compatibility wrapper for older app.py code.
    """

    return generate_ai_answer(
        question,
        context
    )


# ============================================================
# SUMMARIZATION
# ============================================================

def summarize_text(text):

    """
    Generate a summary of the uploaded document.
    """

    if not text:

        return "No text available to summarize."

    prompt = f"""
You are IntelliAssist AI.

Summarize the following document.

Provide:

1. Short overview
2. Main points
3. Important findings
4. Conclusion, if available

Keep the summary clear and concise.

Do not invent information.

DOCUMENT:

{text}

SUMMARY:
"""

    return _generate_with_gemini(prompt)


# ============================================================
# SENTIMENT ANALYSIS
# ============================================================

def analyze_sentiment(text):

    """
    Perform sentiment analysis using TextBlob.

    Returns all fields expected by app.py.
    """

    if not text:

        return {
            "label": "Neutral",
            "score": 0.5,
            "polarity": 0.0,
            "subjectivity": 0.0
        }

    analysis = TextBlob(text)

    polarity = analysis.sentiment.polarity

    subjectivity = (
        analysis.sentiment.subjectivity
    )

    if polarity > 0.1:

        label = "Positive"

    elif polarity < -0.1:

        label = "Negative"

    else:

        label = "Neutral"

    score = (polarity + 1) / 2

    return {
        "label": label,
        "score": round(score, 3),
        "polarity": round(polarity, 3),
        "subjectivity": round(
            subjectivity,
            3
        )
    }


# ============================================================
# INTENT DETECTION
# ============================================================

def detect_intent(question):

    """
    Detect the basic intent of a user question.
    """

    if not question:

        return "General Question"

    question_lower = question.lower()

    if any(
        word in question_lower
        for word in [
            "summarize",
            "summary",
            "brief",
            "overview"
        ]
    ):

        return "Summarization"

    if any(
        word in question_lower
        for word in [
            "what",
            "who",
            "when",
            "where",
            "which"
        ]
    ):

        return "Information Retrieval"

    if any(
        word in question_lower
        for word in [
            "how",
            "explain",
            "why"
        ]
    ):

        return "Explanation"

    if any(
        word in question_lower
        for word in [
            "compare",
            "difference",
            "different"
        ]
    ):

        return "Comparison"

    return "General Question"