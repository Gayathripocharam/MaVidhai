import streamlit as st

from document_processor import (
    extract_text,
    clean_text,
    split_text
)

from rag_engine import RAGEngine

from ai_features import (
    generate_ai_answer,
    summarize_text,
    analyze_sentiment,
    detect_intent
)


# ============================================================
# PAGE CONFIGURATION
# ============================================================

st.set_page_config(
    page_title="IntelliAssist",
    page_icon="📚",
    layout="wide",
    initial_sidebar_state="collapsed"
)


# ============================================================
# SESSION STATE
# ============================================================

if "setup_step" not in st.session_state:
    st.session_state.setup_step = 1

if "setup_complete" not in st.session_state:
    st.session_state.setup_complete = False

if "user_type" not in st.session_state:
    st.session_state.user_type = ""

if "purpose" not in st.session_state:
    st.session_state.purpose = ""

if "rag_engine" not in st.session_state:
    st.session_state.rag_engine = None

if "document_text" not in st.session_state:
    st.session_state.document_text = ""

if "document_name" not in st.session_state:
    st.session_state.document_name = ""

if "chunks" not in st.session_state:
    st.session_state.chunks = []

if "chat_history" not in st.session_state:
    st.session_state.chat_history = []


# ============================================================
# CUSTOM CSS
# ============================================================

st.markdown(
    """
    <style>

    /* -------------------------------------------------------
       MAIN PAGE
       ------------------------------------------------------- */

    .stApp {
        background: #24203A;
        color: #F4F1FA;
    }

    .main .block-container {
        max-width: 1200px;
        padding-top: 2rem;
        padding-bottom: 3rem;
    }


    /* -------------------------------------------------------
       HIDE SIDEBAR
       ------------------------------------------------------- */

    section[data-testid="stSidebar"] {
        display: none;
    }

    button[data-testid="stSidebarCollapsedControl"] {
        display: none;
    }


    /* -------------------------------------------------------
       TEXT
       ------------------------------------------------------- */

    h1, h2, h3, h4, h5, h6 {
        color: #F7F4FC !important;
    }

    p {
        color: #D8D2E5 !important;
    }

    label {
        color: #EDE8F6 !important;
    }


    /* -------------------------------------------------------
       FIRST SCREEN
       ------------------------------------------------------- */

    .setup-title {
        text-align: center;
        color: #F7F4FC !important;
        font-size: 42px;
        font-weight: 750;
        margin-top: 40px;
        margin-bottom: 8px;
    }

    .setup-subtitle {
        text-align: center;
        color: #BEB6D1 !important;
        font-size: 17px;
        margin-bottom: 40px;
    }


    /* -------------------------------------------------------
       QUESTION BOX
       ------------------------------------------------------- */

    .question-box {
        background: #302A4A;
        border: 1px solid #4B4264;
        border-radius: 22px;
        padding: 30px;
        margin-bottom: 20px;
        box-shadow: 0 12px 30px rgba(0,0,0,0.20);
    }

    .question-title {
        color: #F7F4FC !important;
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 7px;
    }

    .question-subtitle {
        color: #BEB6D1 !important;
        font-size: 14px;
        margin-bottom: 20px;
    }


    /* -------------------------------------------------------
       RADIO BUTTONS
       ------------------------------------------------------- */

    div[role="radiogroup"] {
        gap: 10px;
    }

    div[role="radiogroup"] label {
        background: #3A3355;
        border: 1px solid #50466D;
        border-radius: 12px;
        padding: 12px 15px;
        color: #F4F1FA !important;
        transition: 0.2s;
    }

    div[role="radiogroup"] label:hover {
        background: #463D63;
        border-color: #7969A3;
    }

    div[role="radiogroup"] label p {
        color: #F4F1FA !important;
    }


    /* -------------------------------------------------------
       BUTTONS
       ------------------------------------------------------- */

    .stButton > button {
        background: #6F5A9E;
        color: #FFFFFF !important;
        border: 1px solid #806BB0;
        border-radius: 12px;
        min-height: 45px;
        font-weight: 650;
        transition: 0.2s;
    }

    .stButton > button:hover {
        background: #806BB0;
        border-color: #9B87C7;
        color: #FFFFFF !important;
    }


    /* -------------------------------------------------------
       APP HEADER
       ------------------------------------------------------- */

    .app-header {
        background: linear-gradient(
            135deg,
            #302A4A,
            #4B3D70,
            #66528E
        );

        padding: 30px 35px;
        border-radius: 22px;
        margin-bottom: 25px;

        border: 1px solid #5A4C78;

        box-shadow: 0 12px 30px rgba(0,0,0,0.20);
    }

    .app-title {
        color: #FFFFFF !important;
        font-size: 38px;
        font-weight: 750;
    }

    .app-subtitle {
        color: #DDD6EA !important;
        font-size: 16px;
        margin-top: 8px;
    }


    /* -------------------------------------------------------
       WELCOME CARD
       ------------------------------------------------------- */

    .welcome-card {
        background: #302A4A;
        border: 1px solid #494064;
        border-radius: 18px;
        padding: 22px 25px;
        margin-bottom: 22px;
        box-shadow: 0 6px 18px rgba(0,0,0,0.15);
    }

    .welcome-title {
        color: #F7F4FC !important;
        font-size: 22px;
        font-weight: 700;
    }

    .welcome-text {
        color: #C9C1D9 !important;
        font-size: 15px;
        line-height: 1.6;
    }


    /* -------------------------------------------------------
       FEATURE CARDS
       ------------------------------------------------------- */

    .feature-card {
        background: #302A4A;
        border: 1px solid #494064;
        border-radius: 17px;
        padding: 20px;
        min-height: 125px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.15);
    }

    .feature-icon {
        font-size: 26px;
        margin-bottom: 8px;
    }

    .feature-title {
        color: #F7F4FC !important;
        font-size: 16px;
        font-weight: 700;
    }

    .feature-text {
        color: #C2B9D2 !important;
        font-size: 13px;
        line-height: 1.5;
    }


    /* -------------------------------------------------------
       SOURCE CARDS
       ------------------------------------------------------- */

    .source-card {
        background: #342E4D;
        border: 1px solid #50466D;
        border-radius: 12px;
        padding: 15px;
        margin-top: 10px;
        color: #E9E4F1 !important;
    }


    /* -------------------------------------------------------
       METRICS
       ------------------------------------------------------- */

    [data-testid="stMetric"] {
        background: #302A4A;
        border: 1px solid #494064;
        padding: 15px;
        border-radius: 14px;
    }

    [data-testid="stMetricLabel"] {
        color: #C5BDD4 !important;
    }

    [data-testid="stMetricValue"] {
        color: #FFFFFF !important;
    }


    /* -------------------------------------------------------
       INPUT BOXES
       ------------------------------------------------------- */

    .stTextInput input,
    .stTextArea textarea {
        background: #FFFFFF !important;
        color: #24203A !important;
        border-radius: 10px;
    }

    .stTextInput input::placeholder,
    .stTextArea textarea::placeholder {
        color: #77727F !important;
    }


    /* -------------------------------------------------------
       TABS
       ------------------------------------------------------- */

    button[data-baseweb="tab"] {
        color: #CFC7DC !important;
        font-weight: 600;
    }

    button[data-baseweb="tab"][aria-selected="true"] {
        color: #FFFFFF !important;
    }


    /* -------------------------------------------------------
       DIVIDER
       ------------------------------------------------------- */

    hr {
        border-color: #494064 !important;
    }


    /* -------------------------------------------------------
       FOOTER
       ------------------------------------------------------- */

    .footer {
        text-align: center;
        color: #8B8499;
        font-size: 13px;
        padding-top: 15px;
    }

    </style>
    """,
    unsafe_allow_html=True
)


# ============================================================
# FIRST SCREEN
# ============================================================

if not st.session_state.setup_complete:

    st.markdown(
        '<div class="setup-title">📚 IntelliAssist</div>',
        unsafe_allow_html=True
    )

    st.markdown(
        '<div class="setup-subtitle">Your smart document companion</div>',
        unsafe_allow_html=True
    )


    # ========================================================
    # STEP 1 — WHO ARE YOU?
    # ========================================================

    if st.session_state.setup_step == 1:

        st.subheader("👋 Who are you?")
        st.write("Choose the option that best describes you.")


        user_type = st.radio(
            "Who are you?",
            [
                "🎓 Student",
                "👨‍🏫 Professor / Teacher",
                "🔬 Researcher",
                "💼 Professional",
                "👤 Other"
            ],
            label_visibility="collapsed"
        )


        st.write("")


        if st.button(
            "Continue →",
            use_container_width=True
        ):

            st.session_state.user_type = user_type

            st.session_state.setup_step = 2

            st.rerun()


    # ========================================================
    # STEP 2 — PURPOSE
    # ========================================================

    elif st.session_state.setup_step == 2:

        st.subheader("🎯 What are you going to use IntelliAssist for?")
        st.write("Choose the main purpose for your documents.")


        purpose = st.radio(
            "What are you going to use IntelliAssist for?",
            [
                "📖 Studying",
                "👨‍🏫 Teaching",
                "🔬 Research",
                "💼 Work",
                "📚 General Reading"
            ],
            label_visibility="collapsed"
        )


        st.write("")


        if st.button(
            "Continue to IntelliAssist →",
            use_container_width=True
        ):

            st.session_state.purpose = purpose

            st.session_state.setup_complete = True

            st.rerun()


    st.stop()


# ============================================================
# MAIN APPLICATION HEADER
# ============================================================

st.title("📚 IntelliAssist")

st.markdown(
    "Your intelligent companion for understanding documents, "
    "finding information and learning faster."
)

# ============================================================
# WELCOME MESSAGE
# ============================================================

welcome_messages = {

    "🎓 Student":
        "Upload your study material and ask questions to understand it faster.",

    "👨‍🏫 Professor / Teacher":
        "Upload teaching material, notes or resources and quickly explore their content.",

    "🔬 Researcher":
        "Upload research material and explore important information using semantic search.",

    "💼 Professional":
        "Upload reports and work documents to find useful information quickly.",

    "👤 Other":
        "Upload a document and explore its content using natural language."
}


st.subheader(
    f"👋 Welcome, {st.session_state.user_type}"
)

st.write(
    welcome_messages.get(
        st.session_state.user_type,
        "Upload a document and explore its content."
    )
)

st.write(
    f"**Purpose:** {st.session_state.purpose}"
)
# ============================================================
# DOCUMENT UPLOAD - UP TO 5 FILES
# ============================================================

st.subheader("📂 Upload Your Documents")

uploaded_files = st.file_uploader(
    "Choose up to 5 PDF, TXT or DOCX files",
    type=["pdf", "txt", "docx"],
    accept_multiple_files=True,
    key="document_uploader"
)

if uploaded_files:

    if len(uploaded_files) > 5:
        st.error("⚠️ You can upload a maximum of 5 documents.")
        st.stop()

    st.success(f"📚 {len(uploaded_files)} document(s) selected.")

    if st.button(
        "⚡ Process Documents",
        use_container_width=True
    ):

        all_chunks = []
        document_names = []

        progress = st.progress(0)

        for i, uploaded_file in enumerate(uploaded_files):

            try:

                # Read document
                text = extract_text(uploaded_file)

                if not text:
                    st.warning(
                        f"⚠️ Could not extract text from "
                        f"{uploaded_file.name}"
                    )
                    continue

                # Split into chunks
                chunks = split_text(text)

                # Add document name to every chunk
                for chunk in chunks:

                    all_chunks.append(
                        f"[Document: {uploaded_file.name}]\n\n"
                        f"{chunk}"
                    )

                document_names.append(
                    uploaded_file.name
                )

                progress.progress(
                    (i + 1) / len(uploaded_files)
                )

            except Exception as e:

                st.error(
                    f"Error processing {uploaded_file.name}: {e}"
                )

        # Create ONE searchable index containing all documents
        if all_chunks:

# Create the RAG engine if it does not exist
            if st.session_state.rag_engine is None:
                st.session_state.rag_engine = RAGEngine()

# Add all document chunks to the vector database
            if st.session_state.rag_engine is None:
                st.session_state.rag_engine = RAGEngine()

            st.session_state.rag_engine.add_document(
                all_chunks
            )

            st.session_state.document_text = "\n\n".join(
                all_chunks
            )

            st.session_state.document_names = (
                document_names
            )

            st.session_state.document_count = (
                len(document_names)
            )

            st.session_state.chunk_count = (
                len(all_chunks)
            )

            st.success(
                f"✅ {len(document_names)} document(s) processed "
                f"with {len(all_chunks)} searchable chunks."
            )

            st.rerun()

        else:

            st.error(
                "❌ No readable text was found in the uploaded documents."
            )
# ============================================================
# DOCUMENT SEARCH
# ============================================================

if st.session_state.document_text:

    st.subheader("🔎 Search Your Document")

    st.write(
        "Search for a topic, keyword, or question from your uploaded document."
    )

    search_query = st.text_input(
        "Search",
        placeholder="e.g. What are the main findings?",
        label_visibility="collapsed"
    )

    if search_query:

        results = st.session_state.rag_engine.search(
            search_query,
            top_k=5
        )

        if not results:

            st.warning(
                "No relevant information was found."
            )

        else:

            st.success(
                f"Found {len(results)} relevant sections."
            )

            for result in results:

                st.markdown(
                    f"### 📌 Source {result['chunk_number']}"
                )

                st.write(
                    result["text"]
                )

                st.caption(
                    f"Relevance score: {result['score']:.2f}"
                )

                st.divider()
   # ============================================================
# FEATURE CARDS
# ============================================================

    st.markdown("### ✨ What IntelliAssist can do")

col1, col2, col3 = st.columns(3)

with col1:
    st.subheader("📄 Upload Documents")
    st.write(
        "Upload PDF, DOCX or TXT files and "
        "turn them into an interactive workspace."
    )

with col2:
    st.subheader("💬 Ask Questions")
    st.write(
        "Ask natural questions and find "
        "information directly from your document."
    )

with col3:
    st.subheader("🔎 Semantic Search")
    st.write(
        "Find relevant sections based on meaning "
        "rather than exact keywords."
    )
# ============================================================
# APPLICATION TABS
# ============================================================

tab_chat, tab_summary, tab_analysis, tab_search = st.tabs(
    [
        "💬 Ask Document",
        "📝 Summary",
        "📊 Analysis",
        "🔎 Semantic Search"
    ]
)


# ============================================================
# CHAT TAB
# ============================================================

with tab_chat:

    st.header("💬 Ask Your Document")


    if not st.session_state.document_text:

        st.info(
            "Upload and process a document above to start asking questions."
        )


    else:

        st.write(
            "Ask a question about the information contained in your document."
        )


        # ----------------------------------------------------
        # QUICK QUESTIONS
        # ----------------------------------------------------

        st.markdown("#### ✨ Quick Questions")


        q1, q2, q3, q4 = st.columns(4)


        quick_question = None


        with q1:

            if st.button(
                "📌 Key Points",
                use_container_width=True
            ):

                quick_question = (
                    "What are the key points of this document?"
                )


        with q2:

            if st.button(
                "🧾 Summarize",
                use_container_width=True
            ):

                quick_question = (
                    "Summarize the most important information in this document."
                )


        with q3:

            if st.button(
                "💡 Explain",
                use_container_width=True
            ):

                quick_question = (
                    "What is the main topic of this document? Explain it clearly."
                )


        with q4:

            if st.button(
                "🔍 Findings",
                use_container_width=True
            ):

                quick_question = (
                    "What are the most important findings or conclusions in this document?"
                )


        # ----------------------------------------------------
        # DISPLAY CHAT HISTORY
        # ----------------------------------------------------

        for message in st.session_state.chat_history:

            if message["role"] == "user":

                with st.chat_message("user"):

                    st.write(
                        message["content"]
                    )

            else:

                with st.chat_message("assistant"):

                    st.write(
                        message["content"]
                    )


        # ----------------------------------------------------
        # CHAT INPUT
        # ----------------------------------------------------

        question = st.chat_input(
            "Ask something about your document..."
        )


        if quick_question:

            question = quick_question


        # ----------------------------------------------------
        # PROCESS QUESTION
        # ----------------------------------------------------

        if question:

            st.session_state.chat_history.append(
                {
                    "role": "user",
                    "content": question
                }
            )


            with st.chat_message("user"):

                st.write(
                    question
                )


            # ------------------------------------------------
            # RAG RETRIEVAL
            # ------------------------------------------------

            context, sources = (
                st.session_state.rag_engine.get_context(
                    question,
                    top_k=4
                )
            )


            # ------------------------------------------------
            # GEMINI RESPONSE
            # ------------------------------------------------

            with st.chat_message("assistant"):

                with st.spinner(
                    "Finding the best answer..."
                ):

                    answer = generate_ai_answer(
                        question,
                        context
                    )


                st.write(
                    answer
                )


                # ------------------------------------------------
                # SOURCE CITATIONS
                # ------------------------------------------------

                if sources:

                    with st.expander(
                        "📚 View Sources"
                    ):

                        for source in sources:

                            st.markdown(
                                f"""
                                <div class="source-card">

                                    <strong>
                                        Source Chunk
                                        {source['chunk_number']}
                                    </strong>

                                    <br><br>

                                    Relevance Score:
                                    {source['score']:.2f}

                                    <br><br>

                                    {source['text']}

                                </div>
                                """,
                                unsafe_allow_html=True
                            )


            # Save response
            st.session_state.chat_history.append(
                {
                    "role": "assistant",
                    "content": answer
                }
            )


# ============================================================
# SUMMARY TAB
# ============================================================

with tab_summary:

    st.header("📝 Document Summary")


    if not st.session_state.document_text:

        st.info(
            "Upload and process a document first."
        )


    else:

        st.write(
            "Create a shorter version of your document."
        )


        if st.button(
            "✨ Generate Summary"
        ):

            with st.spinner(
                "Preparing your summary..."
            ):

                summary = summarize_text(
                    st.session_state.document_text
                )


            st.markdown(
                "### Summary"
            )


            st.write(
                summary
            )


# ============================================================
# ANALYSIS TAB
# ============================================================

with tab_analysis:

    st.header("📊 Document Analysis")


    if not st.session_state.document_text:

        st.info(
            "Upload and process a document first."
        )


    else:

        sentiment = analyze_sentiment(
            st.session_state.document_text
        )


        col1, col2, col3 = st.columns(3)


        with col1:

            st.metric(
                "Characters",
                f"{len(st.session_state.document_text):,}"
            )


        with col2:

            st.metric(
                "Document Chunks",
                len(st.session_state.chunks)
            )


        with col3:

            st.metric(
                "Sentiment",
                sentiment["label"]
            )


        st.divider()


        st.subheader(
            "😊 Sentiment Analysis"
        )


        st.write(
            f"**Overall Sentiment:** "
            f"{sentiment['label']}"
        )


        st.write(
            f"**Polarity:** "
            f"{sentiment['polarity']}"
        )


        st.write(
            f"**Subjectivity:** "
            f"{sentiment['subjectivity']}"
        )


        st.divider()


        st.subheader(
            "🧠 Intent Detection"
        )


        intent_question = st.text_input(
            "Enter a question",
            placeholder="Why is this document important?"
        )


        if intent_question:

            intent = detect_intent(
                intent_question
            )


            st.success(
                f"Detected Intent: **{intent}**"
            )


# ============================================================
# SEMANTIC SEARCH TAB
# ============================================================

with tab_search:

    st.header(
        "🔎 Semantic Document Search"
    )


    if not st.session_state.document_text:

        st.info(
            "Upload and process a document first."
        )


    else:

        st.write(
            "Search your document based on meaning."
        )


        search_query = st.text_input(
            "Search your document",
            placeholder="Enter a topic or question..."
        )


        if search_query:

            results = (
                st.session_state.rag_engine.search(
                    search_query,
                    top_k=5
                )
            )


            if not results:

                st.warning(
                    "No relevant information found."
                )


            else:

                st.write(
                    f"Found {len(results)} relevant sections."
                )


                for result in results:

                    st.markdown(
                        f"""
                        <div class="source-card">

                            <strong>
                                Source Chunk
                                {result['chunk_number']}
                            </strong>

                            <br><br>

                            Relevance Score:
                            {result['score']:.2f}

                            <br><br>

                            {result['text']}

                        </div>
                        """,
                        unsafe_allow_html=True
                    )


# ============================================================
# FOOTER
# ============================================================

st.divider()

st.markdown(
    """
    <div class="footer">

        IntelliAssist • Smart Document Assistant

        <br>

        Python • Streamlit • NLP • RAG • Semantic Search

    </div>
    """,
    unsafe_allow_html=True
)