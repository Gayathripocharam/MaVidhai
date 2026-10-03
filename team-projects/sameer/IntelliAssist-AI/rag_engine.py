import numpy as np
import faiss

from sentence_transformers import SentenceTransformer


class RAGEngine:

    def __init__(self):
        # Load the embedding model
        self.model = SentenceTransformer("all-MiniLM-L6-v2")

        self.chunks = []
        self.embeddings = None
        self.index = None

    # ---------------------------------------------------------
    # ADD DOCUMENT CHUNKS
    # ---------------------------------------------------------
    def add_document(self, chunks):

        self.chunks = chunks

        # If no chunks are provided
        if not self.chunks:
            self.embeddings = None
            self.index = None
            return

        # Create embeddings
        embeddings = self.model.encode(
            self.chunks,
            convert_to_numpy=True,
            normalize_embeddings=True
        )

        # FAISS requires float32
        self.embeddings = embeddings.astype("float32")

        # Get embedding dimension
        dimension = self.embeddings.shape[1]

        # Create FAISS similarity index
        self.index = faiss.IndexFlatIP(dimension)

        # Add embeddings to FAISS
        self.index.add(self.embeddings)

    # ---------------------------------------------------------
    # SEMANTIC SEARCH
    # ---------------------------------------------------------
    def search(self, query, top_k=5, min_score=0.35):

        # No documents uploaded
        if not self.chunks:
            return []

        # FAISS index not available
        if self.index is None:
            return []

        # Convert user question into embedding
        query_embedding = self.model.encode(
            [query],
            convert_to_numpy=True,
            normalize_embeddings=True
        ).astype("float32")

        # Search FAISS
        scores, indexes = self.index.search(
            query_embedding,
            min(top_k, len(self.chunks))
        )

        results = []

        # Process results
        for score, index in zip(scores[0], indexes[0]):

            # Invalid index
            if index < 0:
                continue

            score = float(score)

            # -------------------------------------------------
            # IMPORTANT:
            # Ignore results that are not sufficiently relevant
            # -------------------------------------------------
            if score < min_score:
                continue

            results.append(
                {
                    "text": self.chunks[index],
                    "score": score,
                    "chunk_number": int(index + 1)
                }
            )

        return results

    # ---------------------------------------------------------
    # GET CONTEXT FOR AI
    # ---------------------------------------------------------
    def get_context(self, query, top_k=6):

        # Search relevant chunks
        results = self.search(
            query,
            top_k=top_k,
            min_score=0.35
        )

        # No relevant information found
        if not results:
            return "I could not find relevant information in the uploaded documents.", []

        context_parts = []

        # Build context
        for result in results:

            context_parts.append(
                f"[Source Chunk {result['chunk_number']}]\n"
                f"{result['text']}"
            )

        context = "\n\n".join(context_parts)

        return context, results