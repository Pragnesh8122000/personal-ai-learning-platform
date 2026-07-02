// Learning Content Data - Enriched with videos, illustrations, tables, and deep dives

export interface Quiz {
  q: string;
  options: string[];
  correct: number;
  explain: string;
}

export interface VideoContent {
  youtubeId: string;
  title: string;
  description: string;
  timestamp?: string;
  duration?: string;
  creator?: string;
}


export interface TableContent {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export interface StepContent {
  title: string;
  steps: { label: string; detail: string }[];
}

export interface ImageContent {
  svg: string;
  caption: string;
  alt: string;
}

export interface TopicContent {
  id: string;
  emoji: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  readTime: number;
  tags: string[];
  sections: Section[];
}

export interface Section {
  type: 'heading' | 'paragraph' | 'card' | 'code' | 'quiz' | 'list' | 'mermaid'
      | 'video' | 'callout' | 'table' | 'image' | 'step' | 'pipeline';
  content: string | Quiz | VideoContent | TableContent | StepContent | ImageContent;
  level?: number;
  variant?: 'why' | 'metaphor' | 'caution' | 'tip' | 'info' | 'warning';
}

export interface Flashcard {
  id: string;
  topic: string;
  front: string;
  back: string;
  hint: string;
}

export interface Badge {
  id: string;
  name: string;
  emoji: string;
  desc: string;
}

// ========== FLASHCARDS (Expanded to 27 cards) ==========
export const FLASHCARDS: Flashcard[] = [
  // LLMs
  { id: 'llm-1', topic: 'llms', front: 'What does an LLM predict?', back: 'The next token in a sequence, based on probability distribution over its vocabulary.', hint: 'It\'s not "thinking"...' },
  { id: 'llm-2', topic: 'llms', front: 'What is the context window?', back: 'The maximum amount of text (in tokens) the model can consider at once. GPT-4o-mini has 128K tokens.', hint: 'Working memory' },
  { id: 'llm-3', topic: 'llms', front: 'What temperature should you use for medical triage?', back: 'Temperature 0 — deterministic, factual, no creativity needed.', hint: 'Safety first' },
  { id: 'llm-4', topic: 'llms', front: 'What is self-attention in transformers?', back: 'A mechanism that lets each token attend to all other tokens in the sequence, weighted by relevance.', hint: 'Focus mechanism' },
  { id: 'llm-5', topic: 'llms', front: 'What is BPE tokenization?', back: 'Byte Pair Encoding — starts with characters, iteratively merges most frequent pairs into tokens.', hint: 'Compression algorithm' },

  // Prompt Engineering
  { id: 'prompt-1', topic: 'prompt-engineering', front: 'What is few-shot prompting?', back: 'Providing 2-5 input→output examples before the actual query to demonstrate the pattern.', hint: 'Examples > instructions' },
  { id: 'prompt-2', topic: 'prompt-engineering', front: 'What is the most reliable output format for production?', back: 'Structured output / function calling with JSON schema enforcement.', hint: 'No parsing needed' },
  { id: 'prompt-3', topic: 'prompt-engineering', front: 'What is Chain-of-Thought (CoT) prompting?', back: 'Asking the model to "think step by step" before answering, which improves reasoning accuracy.', hint: 'Show your work' },
  { id: 'prompt-4', topic: 'prompt-engineering', front: 'What is ReAct prompting?', back: 'Reason + Act — the model alternates between thinking and taking actions (tool calls).', hint: 'Think, act, repeat' },

  // Embeddings
  { id: 'embed-1', topic: 'embeddings', front: 'What does cosine similarity measure?', back: 'The angle between two vectors (1.0 = identical direction, 0 = unrelated).', hint: 'Angle, not distance' },
  { id: 'embed-2', topic: 'embeddings', front: 'What is the sweet spot for chunk size in medical RAG?', back: '300–800 tokens with 50–100 token overlap.', hint: 'Not too big, not too small' },
  { id: 'embed-3', topic: 'embeddings', front: 'What is hybrid search?', back: 'Combining vector similarity search with keyword (BM25) search for better recall.', hint: 'Best of both worlds' },

  // RAG
  { id: 'rag-1', topic: 'rag', front: 'What is the #1 benefit of RAG?', back: 'It grounds responses in retrieved evidence, reducing hallucinations.', hint: 'Open-book exam' },
  { id: 'rag-2', topic: 'rag', front: 'What does top-K=5 mean?', back: 'Retrieve the 5 most similar document chunks from the vector database.', hint: 'Retrieval count' },
  { id: 'rag-3', topic: 'rag', front: 'What is HyDE in advanced RAG?', back: 'Hypothetical Document Embeddings — generate a fake answer, embed it, retrieve similar docs.', hint: 'Fake it to find it' },
  { id: 'rag-4', topic: 'rag', front: 'What is re-ranking?', back: 'Using a cross-encoder to re-score retrieved chunks for better precision.', hint: 'Second opinion' },

  // Function Calling
  { id: 'fn-1', topic: 'function-calling', front: 'Why is function calling safer than free-form text?', back: 'The model can only invoke pre-approved schemas — it can\'t invent arbitrary side effects.', hint: 'Constrained output' },
  { id: 'fn-2', topic: 'function-calling', front: 'What is an agentic workflow?', back: 'A loop where the model reasons, calls tools, observes results, and repeats until done.', hint: 'Think-act loop' },

  // Evaluation
  { id: 'eval-1', topic: 'evaluation', front: 'What is the minimum viable eval dataset size?', back: '30+ cases per component. 5 is anecdote; 30+ is a sample.', hint: 'Statistical significance' },
  { id: 'eval-2', topic: 'evaluation', front: 'What is LLM-as-judge evaluation?', back: 'Using a stronger LLM to grade the outputs of a weaker LLM based on rubrics.', hint: 'AI grading AI' },
  { id: 'eval-3', topic: 'evaluation', front: 'What is faithfulness in RAG evaluation?', back: 'Whether the generated answer is grounded in and consistent with the retrieved context.', hint: 'No hallucination' },

  // Production
  { id: 'prod-1', topic: 'production', front: 'Where should emergency detection run?', back: 'Before the LLM is called — as hardcoded rules, not prompt instructions.', hint: 'Hard constraints' },
  { id: 'prod-2', topic: 'production', front: 'What is semantic caching?', back: 'Caching responses for semantically similar (not just identical) queries.', hint: 'Fuzzy cache' },

  // New Topics
  { id: 'agents-1', topic: 'ai-agents', front: 'What is the ReAct pattern?', back: 'Reason-Act-Observe loop: the agent thinks, takes an action, sees the result, and repeats.', hint: 'RAO cycle' },
  { id: 'finetune-1', topic: 'fine-tuning', front: 'When should you fine-tune vs prompt-engineer?', back: 'Fine-tune for style/domain adaptation. Prompt-engineer for task instructions. RAG for knowledge.', hint: 'Know the difference' },
  { id: 'finetune-2', topic: 'fine-tuning', front: 'What is LoRA?', back: 'Low-Rank Adaptation — fine-tunes only small adapter matrices, not the full model. Much cheaper.', hint: 'Efficient fine-tuning' },
  { id: 'safety-1', topic: 'ai-safety', front: 'What is red-teaming in AI safety?', back: 'Systematically probing the model with adversarial inputs to find vulnerabilities.', hint: 'Attack to defend' },
  { id: 'safety-2', topic: 'ai-safety', front: 'What does HIPAA compliance require for AI systems?', back: 'PHI encryption, access controls, audit logs, BAAs with vendors, minimum necessary access.', hint: 'Healthcare privacy' },

  // Medical AI Specialty — Clinical Evaluation
  { id: 'clinic-1', topic: 'clinical-eval', front: 'What does SaMD stand for in medical AI?', back: 'Software as a Medical Device — software intended for medical purposes that performs without being part of a hardware device.', hint: 'FDA terminology' },
  { id: 'clinic-2', topic: 'clinical-eval', front: 'What is "generalizability" in clinical AI evaluation?', back: 'Whether the model performs as well on patient populations, hospitals, and equipment that differ from the training data.', hint: 'Real-world variance' },
  { id: 'clinic-3', topic: 'clinical-eval', front: 'What is the AUROC, and what does 0.5 mean?', back: 'Area Under the Receiver Operating Characteristic curve. 0.5 = no better than random; 1.0 = perfect discrimination.', hint: 'Discrimination metric' },
  { id: 'clinic-4', topic: 'clinical-eval', front: 'What is "subgroup performance" in fairness?', back: 'Model accuracy, sensitivity, and specificity broken down by demographic groups (age, sex, race) to detect disparities.', hint: 'Fairness check' },

  // Medical AI Specialty — Multimodal
  { id: 'multi-1', topic: 'multimodal', front: 'What is a vision-language model (VLM)?', back: 'A model trained on paired image-text data that can both understand images and generate text. Examples: GPT-4V, Med-PaLM 2, LLaVA-Med.', hint: 'Eyes + brain' },
  { id: 'multi-2', topic: 'multimodal', front: 'Why is medical image segmentation hard for LLMs?', back: 'LLMs output text tokens, not pixel masks. Medical segmentation needs pixel-level outputs — usually done with a separate vision model (e.g., U-Net) plugged into the LLM pipeline.', hint: 'Different output type' },
  { id: 'multi-3', topic: 'multimodal', front: 'What is "retrieval-augmented generation" for EHR data?', back: 'Same as text RAG: index patient records, retrieve the most relevant snippets by embedding similarity, then pass to the LLM as context. Reduces hallucination about patient history.', hint: 'RAG over patient data' },
];

// ========== BADGES ==========
export const BADGES: Badge[] = [
  { id: 'first-xp', name: 'First Steps', emoji: '🌟', desc: 'Earn 50 XP' },
  { id: 'week-streak', name: 'On Fire', emoji: '🔥', desc: '7 day streak' },
  { id: 'month-streak', name: 'Dedicated', emoji: '💪', desc: '30 day streak' },
  { id: 'quiz-master', name: 'Quiz Master', emoji: '🎯', desc: '10 correct answers' },
  { id: 'learner', name: 'Fast Learner', emoji: '📚', desc: 'Complete 3 topics' },
  { id: 'perfect-quiz', name: 'Perfectionist', emoji: '💎', desc: '100% on a quiz' },
  { id: 'marathon', name: 'Marathoner', emoji: '🏃', desc: '500 total XP' },
  { id: 'scholar', name: 'Scholar', emoji: '🎓', desc: 'Complete all 10 topics' },
  { id: 'video-watcher', name: 'Video Buff', emoji: '📺', desc: 'Watch 10 embedded videos' },
  { id: 'med-spec', name: 'Med-AI Specialist', emoji: '🩺', desc: 'Complete all medical-AI topics' },
];

// ========== TOPICS (Expanded with videos, tables, steps, callouts) ==========
export const TOPICS: TopicContent[] = [
  {
    id: 'llms',
    emoji: '🧠',
    title: 'How LLMs Actually Work',
    difficulty: 'easy',
    readTime: 25,
    tags: ['fundamentals', 'theory', 'transformers'],
    sections: [
      {
        type: 'card',
        variant: 'why',
        content: 'You cannot build reliable AI features on top of a model you don\'t understand. Every debugging session, every "why did the model do that?!" moment, every prompt-rewrite decision — all of it gets easier once you know what\'s happening under the hood.',
      },
      {
        type: 'video',
        content: {
          youtubeId: 'zjkBMFhNj_g',
          title: 'Intro to Large Language Models',
          description: 'Andrej Karpathy explains LLMs from first principles — tokens, neural networks, and next-token prediction.',
          duration: '1 hour 2 min',
          creator: 'Andrej Karpathy',
        } as VideoContent,
      },
      {
        type: 'heading',
        content: 'The Core Idea: Next-Token Prediction',
        level: 2,
      },
      {
        type: 'paragraph',
        content: 'An LLM is, at its core, a **next-token predictor**. You give it text. It computes a probability distribution over every possible next token. It picks one. Adds it to the output. Repeats until done.\n\nThat\'s it. Everything else — instruction-following, reasoning, tool use, "personality" — emerges from training on huge amounts of human-written text where those patterns exist.',
      },
      {
        type: 'image',
        content: {
          svg: `<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#5b8def"/></marker></defs>
  <rect x="20" y="70" width="80" height="60" rx="8" fill="#5b8def20" stroke="#5b8def" stroke-width="2"/>
  <text x="60" y="105" text-anchor="middle" fill="#5b8def" font-size="12" font-weight="bold">Input</text>
  <rect x="140" y="70" width="80" height="60" rx="8" fill="#2ccca020" stroke="#2ccca0" stroke-width="2"/>
  <text x="180" y="100" text-anchor="middle" fill="#2ccca0" font-size="12" font-weight="bold">Tokenizer</text>
  <rect x="260" y="70" width="100" height="60" rx="8" fill="#f59e0b20" stroke="#f59e0b" stroke-width="2"/>
  <text x="310" y="100" text-anchor="middle" fill="#f59e0b" font-size="12" font-weight="bold">Model</text>
  <rect x="400" y="70" width="90" height="60" rx="8" fill="#ef444420" stroke="#ef4444" stroke-width="2"/>
  <text x="445" y="100" text-anchor="middle" fill="#ef4444" font-size="12" font-weight="bold">Probs</text>
  <rect x="520" y="70" width="60" height="60" rx="8" fill="#8b5cf620" stroke="#8b5cf6" stroke-width="2"/>
  <text x="550" y="100" text-anchor="middle" fill="#8b5cf6" font-size="12" font-weight="bold">Sample</text>
  <line x1="100" y1="100" x2="140" y2="100" stroke="#5b8def" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="220" y1="100" x2="260" y2="100" stroke="#5b8def" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="360" y1="100" x2="400" y2="100" stroke="#5b8def" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="490" y1="100" x2="520" y2="100" stroke="#5b8def" stroke-width="2" marker-end="url(#arrow)"/>
  <path d="M550,130 Q550,160 310,160 Q70,160 70,130" stroke="#5b8def" stroke-width="2" stroke-dasharray="5,5" fill="none"/>
  <text x="310" y="180" text-anchor="middle" fill="#5b8def" font-size="11">Repeat until done</text>
</svg>`,
          caption: 'The LLM pipeline: Input → Tokenize → Model → Probabilities → Sample → Repeat (the sampled token is fed back as the next input — this is "autoregressive" generation)',
          alt: 'LLM generation pipeline diagram',
        } as ImageContent,
      },
      {
        type: 'heading',
        content: 'The Transformer Architecture',
        level: 2,
      },
      {
        type: 'paragraph',
        content: 'Modern LLMs use the **Transformer** architecture, introduced in the 2017 paper "Attention Is All You Need." The key innovation is **self-attention** — a mechanism that lets each token attend to all other tokens in the sequence, weighted by relevance.',
      },
      {
        type: 'callout',
        variant: 'info',
        content: '**The attention mechanism in 60 seconds.**\n\n**Vector** = just a list of numbers, e.g. `[0.12, -0.34, 0.88]`. Embeddings (covered next) are vectors.\n\n**Softmax** = a function that turns any list of numbers into probabilities (percentages summing to 1.0).\n\nFor each token, the model computes three vectors: Query (what am I looking for?), Key (what do I contain?), and Value (what information do I carry?). Attention = softmax(Query × Keyᵀ) × Value. This lets "headache" attend to "patient" and "symptoms" more than "tomorrow".',
      },
      {
        type: 'heading',
        content: 'Tokens, Not Words',
        level: 2,
      },
      {
        type: 'paragraph',
        content: 'Models don\'t see words. They see **tokens** — roughly 4 characters of English text on average. "Hello there" = 2 tokens. "Antidisestablishmentarianism" = 6 tokens (verify in OpenAI\'s tokenizer tool — exact counts vary slightly by model). Costs, latency, and context-window limits are all measured in tokens, not characters.',
      },
      {
        type: 'callout',
        variant: 'tip',
        content: '**(BPE = Byte Pair Encoding, defined below)** **Tokenization tip:** Use a tokenizer visualizer (like platform.openai.com/tokenizer) to see how your text gets split. Medical terms often split unexpectedly: "myocardial infarction" might become ["my", "ocard", "ial", " inf", "arction"].',
      },
      {
        type: 'heading',
        content: 'How Tokenization Works: BPE',
        level: 3,
      },
      {
        type: 'paragraph',
        content: 'Most LLMs use **Byte Pair Encoding (BPE)** tokenization. It starts with every character as a token, then iteratively merges the most frequent adjacent pairs. After enough iterations, you have a vocabulary of ~50,000-100,000 tokens that efficiently covers common words and subword units.',
      },
      {
        type: 'step',
        content: {
          title: 'BPE Tokenization Process',
          steps: [
            { label: 'Start with characters', detail: 'Every character (a-z, 0-9, punctuation) is a token' },
            { label: 'Count frequent pairs', detail: 'Find the most common adjacent token pair (e.g., "th")' },
            { label: 'Merge', detail: 'Create a new token "th" and replace all occurrences' },
            { label: 'Repeat', detail: 'Continue merging until vocabulary reaches target size (~50K tokens)' },
            { label: 'Encode', detail: 'New text is tokenized by greedily matching longest tokens first' },
          ],
        } as StepContent,
      },
      {
        type: 'heading',
        content: 'Context Window',
        level: 2,
      },
      {
        type: 'paragraph',
        content: 'The **context window** is the model\'s "working memory." Everything you send (system prompt + conversation history + retrieved docs + user question + tool outputs) must fit in this window. For GPT-4o-mini it\'s 128K tokens. Sounds huge, but it fills up fast when you stuff in retrieved documents.',
      },
      {
        type: 'table',
        content: {
          headers: ['Model', 'Context Window', 'Input Cost', 'Output Cost', 'Best For'],
          rows: [
            ['GPT-4o-mini', '128K tokens', '$0.15/M', '$0.60/M', 'Default choice, cost-effective'],
            ['GPT-4o', '128K tokens', '$2.50/M', '$10/M', 'Complex reasoning, multimodal'],
            ['Claude 3.5 Sonnet', '200K tokens', '$3/M', '$15/M', 'Long documents, coding'],
            ['Gemini 1.5 Pro', '2M tokens', '$1.25/M', '$5/M', 'Massive context (books, videos)'],
            ['Llama 3.1 405B', '128K tokens', 'Open source', 'Open source', 'Self-hosted deployments'],
          ],
          caption: 'Comparison of popular LLM providers (prices as of 2024)',
        } as TableContent,
      },
      {
        type: 'heading',
        content: 'Temperature & Top-p',
        level: 2,
      },
      {
        type: 'list',
        content: '**Temperature 0** = always pick the highest-probability token = deterministic, factual, boring\n\n**Temperature 0.7–1.0** = sample from the distribution = creative, varied, can hallucinate\n\n**Top-p** = only sample from the top X% of probability mass = another way to control randomness\n\n**Production rule:** Use temperature 0 for medical guidance, classification, structured extraction, and tool calls. Use higher temperature only for creative writing tasks.',
      },
      {
        type: 'callout',
        variant: 'info',
        content: '**Worked example.** Given probabilities `{headache: 0.45, migraine: 0.25, pain: 0.15, discomfort: 0.10, pressure: 0.05}` and `top_p=0.80`: tokens `headache` (0.45) and `migraine` (0.25) form the nucleus (cumulative 0.70). Adding `pain` (0.15) crosses 0.80, so the nucleus is `{headache, migraine, pain}` — three tokens, even though `top_p=0.80`. The model samples from these three, never from `discomfort` or `pressure`.',
      },
      {
        type: 'code',
        content: `// The smallest useful LLM call
const response = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  temperature: 0,                // deterministic for medical
  messages: [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: userMessage },
  ],
});

const text = response.choices[0].message.content;
const tokens = response.usage.total_tokens; // Track this for cost!`,
      },
      {
        type: 'video',
        content: {
          youtubeId: '5suKqHN5M8M',
          title: 'But what is a GPT?',
          description: '3Blue1Brown\'s visual explanation of how transformers process text.',
          duration: '27 min',
          creator: '3Blue1Brown',
        } as VideoContent,
      },
      {
        type: 'heading',
        content: 'Real-World Example: Vaidya-Assist',
        level: 2,
      },
      {
        type: 'step',
        content: {
          title: 'What happens when a patient types "I have chest pain"?',
          steps: [
            { label: 'Emergency guardrail fires', detail: 'Regex matches "chest pain" → immediately return "Call 112" without calling LLM' },
            { label: 'If not emergency, tokenize', detail: '"I have chest pain" → 4 tokens (~15 chars)' },
            { label: 'Build prompt', detail: 'System prompt (~200 tokens) + conversation history (~300 tokens) + retrieved medical knowledge (~800 tokens) + user message (4 tokens)' },
            { label: 'Model computes probabilities', detail: 'For each position in the output, the model computes a probability distribution over ~50,000 tokens' },
            { label: 'Sample tokens', detail: 'Temperature 0 → always pick highest probability. "I" → " understand" → " that" → " chest" → " pain" → ...' },
            { label: 'Stream response', detail: 'Tokens are sent back via Socket.IO as they\'re generated, creating the typing effect' },
          ],
        } as StepContent,
      },
      {
        type: 'card',
        variant: 'caution',
        content: 'Common pitfalls:\n\n• **Treating the model like a database.** It isn\'t. If you need exact retrieval of a specific document, use RAG, not prompting.\n• **Ignoring token costs.** A 50-turn conversation can easily cost 10x a single-turn one. Cache aggressively.\n• **Not setting temperature to 0 for medical work.** You want the same input to always produce the same output during testing.',
      },
      {
        type: 'quiz',
        content: {
          q: 'Why is hallucination dangerous specifically for Vaidya-Assist?',
          options: [
            'It costs more money',
            'It causes slower response times',
            'It can produce false medical advice that looks authoritative',
          ],
          correct: 2,
          explain: 'Hallucination is a trust issue. In a doctor-patient context, a confident-sounding but invented medical claim is the worst possible failure mode.',
        } as Quiz,
      },
      {
        type: 'quiz',
        content: {
          q: 'What does the self-attention mechanism allow?',
          options: [
            'The model to process multiple languages simultaneously',
            'Each token to attend to all other tokens in the sequence, weighted by relevance',
            'The model to generate multiple tokens in parallel',
          ],
          correct: 1,
          explain: 'Self-attention lets each token "look at" all other tokens and weigh their importance. This is how "headache" knows to attend to "patient" and "symptoms" more than unrelated words.',
        } as Quiz,
      },
      {
        type: 'quiz',
        content: {
          q: 'If your context window is 128K tokens and you\'re at 120K tokens, what happens?',
          options: [
            'It continues generating but loses coherence',
            'Most APIs reject the request with a 400/413 error',
            'The model ignores tokens beyond the limit (truncation) silently',
          ],
          correct: 1,
          explain: 'Modern APIs (OpenAI, Anthropic, Google) reject the request with a 400 / 413 error. Silent truncation is rare and not the default — the API will tell you when you exceed the limit. Always track token count and implement truncation strategies (keep last N turns, summarize older context) to stay under the limit proactively.',
        } as Quiz,
      },
    ],
  },
  {
    id: 'prompt-engineering',
    emoji: '✍️',
    title: 'Prompt Engineering That Actually Scales',
    difficulty: 'easy',
    readTime: 28,
    tags: ['fundamentals', 'practical', 'prompts'],
    sections: [
      {
        type: 'card',
        variant: 'why',
        content: 'Your prompt is the most-edited file in any LLM application. Get it wrong and the model hallucinates, misroutes intents, ignores guardrails, or returns unparseable JSON. Get it right and a tiny prompt swap can fix bugs that took a week of model retraining in the old world.',
      },
      {
        type: 'video',
        content: {
          youtubeId: 'dOxUroR57xs',
          title: 'Prompt Engineering Overview',
          description: 'DAIR.AI\'s comprehensive lecture on prompt engineering techniques, tools, and applications.',
          duration: '1 hour 4 min',
          creator: 'DAIR.AI (Elvis Saravia)',
        } as VideoContent,
      },
      {
        type: 'heading',
        content: 'Anatomy of a Prompt',
        level: 2,
      },
      {
        type: 'image',
        content: {
          svg: `<svg viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="arrow-anat" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#5b8def"/></marker></defs>
  <rect width="600" height="360" fill="#0b1020"/>
  <!-- System message block -->
  <rect x="40" y="30" width="520" height="110" rx="10" fill="#8b5cf620" stroke="#8b5cf6" stroke-width="2"/>
  <text x="55" y="55" fill="#8b5cf6" font-size="13" font-weight="bold">SYSTEM MESSAGE  (role: "system")</text>
  <text x="55" y="78" fill="#cbd5e1" font-size="11">• Defines persona, scope, output format</text>
  <text x="55" y="95" fill="#cbd5e1" font-size="11">• Sets guardrails (what NOT to do)</text>
  <text x="55" y="112" fill="#cbd5e1" font-size="11">• Sets tone, language, audience</text>
  <text x="55" y="129" fill="#cbd5e1" font-size="11">• Cached separately — cheap to keep static</text>
  <!-- User message block -->
  <rect x="40" y="160" width="520" height="90" rx="10" fill="#5b8def20" stroke="#5b8def" stroke-width="2"/>
  <text x="55" y="185" fill="#5b8def" font-size="13" font-weight="bold">USER MESSAGE  (role: "user")</text>
  <text x="55" y="208" fill="#cbd5e1" font-size="11">• The actual input: question, document, command</text>
  <text x="55" y="225" fill="#cbd5e1" font-size="11">• Often templated with variables: "Patient: {name}, Age: {age}"</text>
  <text x="55" y="242" fill="#cbd5e1" font-size="11">• Re-sent every turn — every token counts</text>
  <!-- Assistant message block -->
  <rect x="40" y="270" width="520" height="70" rx="10" fill="#2ccca020" stroke="#2ccca0" stroke-width="2"/>
  <text x="55" y="295" fill="#2ccca0" font-size="13" font-weight="bold">ASSISTANT MESSAGE  (role: "assistant")</text>
  <text x="55" y="318" fill="#cbd5e1" font-size="11">• Model's reply (or pre-seeded few-shot example)</text>
  <text x="55" y="333" fill="#cbd5e1" font-size="11">• In few-shot, prior assistant turns teach the format</text>
</svg>`,
          caption: 'Anatomy of an LLM prompt: a system block sets behavior, user block carries the question, assistant blocks either reply or seed examples',
        } as ImageContent,
      },
      {
        type: 'heading',
        content: 'The 6 Patterns You Must Know',
        level: 2,
      },
      {
        type: 'heading',
        content: '1. Zero-shot (No Examples)',
        level: 3,
      },
      {
        type: 'code',
        content: `System: Classify the user's intent. Output JSON.

User: I need to book an appointment with a cardiologist.

Output: {"intent": "book_appointment", "specialty": "cardiology"}`,
      },
      {
        type: 'heading',
        content: '2. Few-shot (Give Examples)',
        level: 3,
      },
      {
        type: 'code',
        content: `User: My head hurts
Output: {"intent": "symptom_intake"}

User: Can I see a doctor tomorrow?
Output: {"intent": "book_appointment"}

User: What causes kidney stones?
Output: {"intent": "general_question"}

User: I have chest pain and can't breathe
Output: {"intent": "emergency"}`,
      },
      {
        type: 'heading',
        content: '3. Chain-of-Thought (Think Step by Step)',
        level: 3,
      },
      {
        type: 'paragraph',
        content: 'For complex reasoning tasks, ask the model to **"think before answering."** This works because the model uses its own intermediate reasoning as additional context for the final answer. The reasoning tokens become part of the context window.',
      },
      {
        type: 'code',
        content: `User: A patient has headache (3 days), fever (38.5°C), and fatigue.
They also mentioned recent travel to a malaria-endemic region.
What should I prioritize in my differential diagnosis?

Assistant: Let me think through this step by step:

1. Key symptoms: headache + fever + fatigue = systemic illness
2. Duration: 3 days = acute, not chronic
3. Travel history: malaria-endemic region = exposure risk
4. Red flags: fever >38°C + travel = possible tropical disease

Differential diagnosis (prioritized by urgency):
1. Malaria (high priority - travel history + fever pattern)
2. Viral syndrome (common, but travel makes malaria more likely)
3. Meningitis (less likely without neck stiffness, but rule out)
4. Dengue/Typhoid (depending on specific region)

Recommendation: Malaria rapid test + blood smear.`,
      },
      {
        type: 'quiz',
        content: {
          q: 'Why does Chain-of-Thought prompting improve reasoning?',
          options: [
            'It makes the model think harder',
            'The reasoning tokens become additional context for the final answer',
            'It uses more tokens so the model has more time to compute',
          ],
          correct: 1,
          explain: 'The model\'s intermediate reasoning tokens are part of the context window. When generating the final answer, the model can "read" its own reasoning.',
        } as Quiz,
      },
      {
        type: 'heading',
        content: '4. ReAct (Reason + Act)',
        level: 3,
      },
      {
        type: 'paragraph',
        content: '**ReAct** interleaves thought, action, and observation. The model decides what to do, calls a tool, reads the result, then reasons again. It\'s the spine of every agent and tool-using system. We\'ll see ReAct as a full agentic loop with tool-calling and the production code in the **ai-agents** topic — here we\'re focusing on the prompt shape.',
      },
      {
        type: 'image',
        content: {
          svg: `<svg viewBox="0 0 620 280" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="arrow-react" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#5b8def"/></marker></defs>
  <rect width="620" height="280" fill="#0b1020"/>
  <!-- Thought -->
  <rect x="20" y="20" width="130" height="60" rx="8" fill="#8b5cf620" stroke="#8b5cf6" stroke-width="2"/>
  <text x="85" y="42" text-anchor="middle" fill="#8b5cf6" font-size="11" font-weight="bold">Thought</text>
  <text x="85" y="60" text-anchor="middle" fill="#cbd5e1" font-size="9">"Need to check</text>
  <text x="85" y="72" text-anchor="middle" fill="#cbd5e1" font-size="9">drug interaction"</text>
  <!-- Action -->
  <rect x="180" y="20" width="130" height="60" rx="8" fill="#5b8def20" stroke="#5b8def" stroke-width="2"/>
  <text x="245" y="42" text-anchor="middle" fill="#5b8def" font-size="11" font-weight="bold">Action</text>
  <text x="245" y="60" text-anchor="middle" fill="#cbd5e1" font-size="9">check_drug_db(</text>
  <text x="245" y="72" text-anchor="middle" fill="#cbd5e1" font-size="9">"warfarin + aspirin")</text>
  <!-- Observation -->
  <rect x="340" y="20" width="150" height="60" rx="8" fill="#2ccca020" stroke="#2ccca0" stroke-width="2"/>
  <text x="415" y="42" text-anchor="middle" fill="#2ccca0" font-size="11" font-weight="bold">Observation</text>
  <text x="415" y="60" text-anchor="middle" fill="#cbd5e1" font-size="9">"Major interaction:</text>
  <text x="415" y="72" text-anchor="middle" fill="#cbd5e1" font-size="9">bleeding risk HIGH"</text>
  <!-- Final answer -->
  <rect x="510" y="20" width="90" height="60" rx="8" fill="#f59e0b20" stroke="#f59e0b" stroke-width="2"/>
  <text x="555" y="45" text-anchor="middle" fill="#f59e0b" font-size="11" font-weight="bold">Answer</text>
  <text x="555" y="63" text-anchor="middle" fill="#cbd5e1" font-size="9">to user</text>
  <!-- Cycle arrow back to Thought -->
  <path d="M415,90 Q415,130 85,130 Q85,110 85,90" fill="none" stroke="#5b8def" stroke-width="2" stroke-dasharray="4,4" marker-end="url(#arrow-react)"/>
  <text x="250" y="125" text-anchor="middle" fill="#5b8def" font-size="10" font-style="italic">repeat until done</text>
  <!-- Concrete medical example -->
  <rect x="20" y="160" width="580" height="100" rx="8" fill="#1e293b" stroke="#475569" stroke-width="1"/>
  <text x="35" y="180" fill="#94a3b8" font-size="11" font-weight="bold">Medical example:</text>
  <text x="35" y="200" fill="#cbd5e1" font-size="10">Thought: Patient is on warfarin and just started aspirin — I should check for interactions.</text>
  <text x="35" y="218" fill="#cbd5e1" font-size="10">Action: check_drug_interaction(drug_a="warfarin", drug_b="aspirin")</text>
  <text x="35" y="236" fill="#cbd5e1" font-size="10">Observation: {"severity": "major", "risk": "GI bleeding", "action": "avoid combo"}</text>
  <text x="35" y="254" fill="#cbd5e1" font-size="10">Answer: "⚠️ Warfarin + aspirin raises bleeding risk significantly. Consult prescriber before combining."</text>
</svg>`,
          caption: 'ReAct loop: Thought → Action → Observation → repeat until the model has enough to answer',
        } as ImageContent,
      },
      {
        type: 'code',
        content: `# ReAct system prompt (simplified)
SYSTEM = """You are a clinical decision-support assistant. To answer, you may use tools.

Always respond in this exact format:
Thought: <your reasoning about what to do next>
Action: <one of: check_drug_interaction | lookup_lab_range | search_guideline | finish>
Action Input: <JSON or text input for the tool>

When you have enough information, use Action: finish and give the final answer."""

# Tool implementations live elsewhere; the prompt only defines the contract.`,
      },
      {
        type: 'heading',
        content: '5. Self-Consistency (Sample, Vote)',
        level: 3,
      },
      {
        type: 'paragraph',
        content: 'Instead of trusting one CoT answer, **sample multiple reasoning paths** (temperature > 0, n=5) and take the **majority vote** on the final answer. This catches the cases where one chain of thought went wrong — the others usually recover.',
      },
      {
        type: 'image',
        content: {
          svg: `<svg viewBox="0 0 620 320" xmlns="http://www.w3.org/2000/svg">
  <rect width="620" height="320" fill="#0b1020"/>
  <!-- Input -->
  <rect x="220" y="15" width="180" height="40" rx="8" fill="#5b8def20" stroke="#5b8def" stroke-width="2"/>
  <text x="310" y="40" text-anchor="middle" fill="#5b8def" font-size="11" font-weight="bold">Patient symptoms (input)</text>
  <!-- 5 parallel chains -->
  <g font-size="9" fill="#cbd5e1" text-anchor="middle">
  <rect x="20" y="80" width="100" height="80" rx="6" fill="#8b5cf620" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="70" y="100" fill="#8b5cf6" font-weight="bold">Chain 1</text>
  <text x="70" y="118">"...malaria..."</text>
  <text x="70" y="132">→ Malaria</text>
  <text x="70" y="150" fill="#2ccca0">✓</text>

  <rect x="140" y="80" width="100" height="80" rx="6" fill="#8b5cf620" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="190" y="100" fill="#8b5cf6" font-weight="bold">Chain 2</text>
  <text x="190" y="118">"...typhoid..."</text>
  <text x="190" y="132">→ Typhoid</text>
  <text x="190" y="150" fill="#ef4444">✗</text>

  <rect x="260" y="80" width="100" height="80" rx="6" fill="#8b5cf620" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="310" y="100" fill="#8b5cf6" font-weight="bold">Chain 3</text>
  <text x="310" y="118">"...malaria..."</text>
  <text x="310" y="132">→ Malaria</text>
  <text x="310" y="150" fill="#2ccca0">✓</text>

  <rect x="380" y="80" width="100" height="80" rx="6" fill="#8b5cf620" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="430" y="100" fill="#8b5cf6" font-weight="bold">Chain 4</text>
  <text x="430" y="118">"...dengue..."</text>
  <text x="430" y="132">→ Dengue</text>
  <text x="430" y="150" fill="#ef4444">✗</text>

  <rect x="500" y="80" width="100" height="80" rx="6" fill="#8b5cf620" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="550" y="100" fill="#8b5cf6" font-weight="bold">Chain 5</text>
  <text x="550" y="118">"...malaria..."</text>
  <text x="550" y="132">→ Malaria</text>
  <text x="550" y="150" fill="#2ccca0">✓</text>
  </g>
  <!-- Vote tally -->
  <rect x="180" y="200" width="260" height="50" rx="8" fill="#f59e0b20" stroke="#f59e0b" stroke-width="2"/>
  <text x="310" y="222" text-anchor="middle" fill="#f59e0b" font-size="12" font-weight="bold">Majority vote (3 of 5)</text>
  <text x="310" y="240" text-anchor="middle" fill="#cbd5e1" font-size="11">Malaria wins (3) vs Typhoid (1) vs Dengue (1)</text>
  <!-- Final answer -->
  <rect x="220" y="270" width="180" height="40" rx="8" fill="#2ccca020" stroke="#2ccca0" stroke-width="2"/>
  <text x="310" y="295" text-anchor="middle" fill="#2ccca0" font-size="12" font-weight="bold">Final answer: Malaria</text>
</svg>`,
          caption: 'Self-consistency: sample 5 reasoning chains, vote on the final answer. Robust to single-chain errors.',
        } as ImageContent,
      },
      {
        type: 'callout',
        variant: 'tip',
        content: 'Self-consistency **costs N×** the tokens. Worth it for high-stakes medical/triage decisions, overkill for casual chat. Combine with caching — the system prompt is shared across all N samples.',
      },
      {
        type: 'heading',
        content: '6. Structured Output (JSON / Schema)',
        level: 3,
      },
      {
        type: 'paragraph',
        content: 'Production systems **never parse free-form LLM text**. You force the model to emit JSON matching a schema, then validate. This makes downstream code simple: you can branch on `intent`, store `entities`, route by `urgency`.',
      },
      {
        type: 'code',
        content: `// Use OpenAI's "JSON mode" or Anthropic's tool-use to enforce schema
const response = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  response_format: {
    type: "json_schema",
    json_schema: {
      name: "triage_response",
      strict: true,
      schema: TriageSchema,
    },
  },
  messages: [
    { role: "system", content: "Classify patient messages into structured triage JSON." },
    { role: "user", content: "I have crushing chest pain radiating to my left arm." },
  ],
});

// Guaranteed valid:
const parsed = JSON.parse(response.choices[0].message.content);
// {
//   "intent": "emergency",
//   "urgency": "high",
//   "specialty": "cardiology",
//   "red_flags": ["chest_pain", "arm_radiation"],
//   "recommended_action": "call_911"
// }`,
      },
      {
        type: 'callout',
        variant: 'tip',
        content: '**Schema-first beats prompt-first.** Defining the JSON schema in your code, then telling the model "respond with this exact schema", is more reliable than describing the format in prose. Modern APIs let you pass the schema directly — the model is constrained at decoding time, not by hoping.',
      },
      {
        type: 'quiz',
        content: {
          q: 'When should you reach for Self-Consistency over plain CoT?',
          options: [
            'For every prompt — it always helps',
            'Only when latency and cost allow N samples, and the decision is high-stakes',
            'Only for non-deterministic, low-risk tasks like creative writing',
          ],
          correct: 1,
          explain: 'Self-consistency costs N× tokens and latency. Reserve it for high-stakes decisions (medical triage, financial) where wrong answers are expensive.',
        } as Quiz,
      },
    ],
  },
  {
    id: 'embeddings',
    emoji: '📐',
    title: 'Embeddings & Vector Search',
    difficulty: 'medium',
    readTime: 24,
    tags: ['fundamentals', 'rag', 'vectors'],
    sections: [
      {
        type: 'card',
        variant: 'why',
        content: 'Embeddings are how you turn "what the patient said" into "the right medical knowledge to answer it." Without embeddings, "chest pain" wouldn\'t match "myocardial infarction symptoms."',
      },
      {
        type: 'video',
        content: {
          youtubeId: 'wgfA0T1B4Ss',
          title: 'Word Embeddings & Vector Search',
          description: '3Blue1Brown\'s visual explanation of how words become vectors and capture meaning.',
          duration: '18 min',
          creator: '3Blue1Brown',
        } as VideoContent,
      },
      {
        type: 'heading',
        content: 'The Metaphor: A Giant Map of Meaning',
        level: 2,
      },
      {
        type: 'card',
        variant: 'metaphor',
        content: 'Imagine you took every sentence ever written and placed it as a dot on a giant map. Sentences with **similar meaning** end up close together, even if they use different words.\n\n"head hurts" is near "I have a headache" is near "migraine symptoms"\n"how do I book" is near "schedule appointment" is near "see a doctor"\n"heart attack" is near "cardiac arrest" is near "myocardial infarction"',
      },
      {
        type: 'heading',
        content: 'How Embeddings Work',
        level: 2,
      },
      {
        type: 'paragraph',
        content: 'An embedding model is just another neural network. You give it text, it outputs a list of numbers (typically 384, 768, 1024, or 1536 numbers long). The magic is that **distance between vectors = distance between meanings**.',
      },
      {
        type: 'image',
        content: {
          svg: `<svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#5b8def;stop-opacity:0.2"/>
      <stop offset="100%" style="stop-color:#2ccca0;stop-opacity:0.2"/>
    </linearGradient>
  </defs>
  <rect width="500" height="400" fill="#0b1020"/>
  <circle cx="250" cy="200" r="150" fill="url(#grad1)" stroke="#5b8def30" stroke-width="2"/>
  <circle cx="200" cy="180" r="8" fill="#5b8def"/><text x="220" y="185" fill="#5b8def" font-size="12">"head hurts"</text>
  <circle cx="230" cy="160" r="8" fill="#5b8def"/><text x="250" y="165" fill="#5b8def" font-size="12">"headache"</text>
  <circle cx="180" cy="200" r="8" fill="#5b8def"/><text x="200" y="205" fill="#5b8def" font-size="12">"migraine"</text>
  <circle cx="300" cy="250" r="8" fill="#2ccca0"/><text x="320" y="255" fill="#2ccca0" font-size="12">"book appointment"</text>
  <circle cx="320" cy="230" r="8" fill="#2ccca0"/><text x="340" y="235" fill="#2ccca0" font-size="12">"schedule"</text>
  <circle cx="100" cy="100" r="8" fill="#f59e0b"/><text x="120" y="105" fill="#f59e0b" font-size="12">"fever"</text>
  <circle cx="120" cy="120" r="8" fill="#f59e0b"/><text x="140" y="125" fill="#f59e0b" font-size="12">"temperature"</text>
  <text x="250" y="380" text-anchor="middle" fill="#9aa3bd" font-size="11">Semantic space: similar meanings cluster together</text>
</svg>`,
          caption: 'Semantic embedding space: related concepts cluster together in vector space',
          alt: 'Vector space visualization showing clustered embeddings',
        } as ImageContent,
      },
      {
        type: 'heading',
        content: 'Cosine Similarity — The Distance Metric',
        level: 2,
      },
      {
        type: 'paragraph',
        content: 'Two vectors, you want a number that says "how similar are they?" **Cosine similarity** measures the angle between two vectors. The result is in [-1, 1] in the general case, but for text embeddings from a single model it usually falls in [0, 1] — embeddings occupy a narrow "cone" so unrelated documents typically score 0.1-0.3 rather than reaching 0 or -1. 1.0 = identical direction, ~0 = unrelated. This is the standard for embeddings.',
      },
      {
        type: 'callout',
        variant: 'info',
        content: '**Why cosine similarity, not Euclidean distance?** Euclidean distance is the straight-line distance between two points (like a ruler on a map). It works for physical distance, but for text vectors what matters is the angle (direction), not the magnitude. Cosine similarity captures that; Euclidean does not. Cosine similarity measures angle, not magnitude. This means a short document and a long document about the same topic will have similar cosine similarity, even if their absolute vector values differ.',
      },
      {
        type: 'heading',
        content: 'Embedding Models Comparison',
        level: 2,
      },
      {
        type: 'table',
        content: {
          headers: ['Date (last updated)', 'Model', 'Dimensions', 'Max Input', 'Cost', 'Best For'],
          rows: [
            ['2026-01', 'text-embedding-3-small', '256 / 512 / 1536 (native 1536, Matryoshka)', '8191 tokens', '$0.00002/1K', 'Default choice, cost-effective'],
            ['2026-01', 'text-embedding-3-large', '3072', '8191 tokens', '$0.00013/1K', 'Higher accuracy needs'],
            ['2026-01', 'text-embedding-ada-002 (deprecated)', '1536', '8191 tokens', '— (no longer offered)', 'Legacy, backward compatibility'],
            ['2026-01', 'Voyage-3', '1024', '32000 tokens', '$0.00006/1K', 'Long documents'],
            ['2026-01', 'Cohere embed-v4 (English, multilingual)', '1024', '128K tokens', '$0.00012/1K', 'Multilingual, RAG, multimodal'],
          ],
          caption: 'Embedding model comparison — small is usually enough for RAG. Voyage has since shipped 3.5 / 4 — check current docs.',
        } as TableContent,
      },
      {
        type: 'heading',
        content: 'Chunking Strategies',
        level: 2,
      },
      {
        type: 'paragraph',
        content: 'You don\'t embed whole documents — you embed **chunks**. A 50-page medical textbook embedded as one vector would match too many things. The right chunk size depends on your content.',
      },
      {
        type: 'step',
        content: {
          title: 'Chunking Strategies Compared',
          steps: [
            { label: 'Fixed-size chunking', detail: 'Split every N tokens. Simple but may cut sentences mid-thought. Use 300-800 tokens with 50-100 token overlap.' },
            { label: 'Recursive chunking', detail: 'Split on paragraph boundaries first, then sentences, then words. Preserves semantic units better.' },
            { label: 'Semantic chunking', detail: 'Use embeddings to find natural breakpoints where meaning shifts. More accurate but slower.' },
            { label: 'Agentic chunking', detail: 'Let an LLM decide chunk boundaries based on content structure. Most accurate, most expensive.' },
          ],
        } as StepContent,
      },
      {
        type: 'callout',
        variant: 'tip',
        content: '**Sweet spot for medical FAQs:** 300–800 tokens with 50–100 token overlap. Too small loses context; too large becomes imprecise.',
      },
      {
        type: 'heading',
        content: 'Hybrid Search',
        level: 2,
      },
      {
        type: 'paragraph',
        content: '**Hybrid search** combines vector similarity with classic keyword (**BM25**) search. BM25 scores how many of the query words appear in a document, weighted by rarity — a query word that appears in only 3 documents is more informative than one that appears in 3,000. It\'s the algorithm that powered search engines like Lucene and Elasticsearch before neural retrieval. This helps for medical terms and drug names where exact matching matters. "Ibuprofen" should match "ibuprofen" exactly, not just semantically similar words.',
      },
      {
        type: 'code',
        content: `// Hybrid search: combine vector + keyword scores
async function hybridSearch(query, vectorResults, keywordResults) {
  const vectorWeight = 0.7;
  const keywordWeight = 0.3;

  const combined = new Map();

  // Add vector results
  for (const r of vectorResults) {
    combined.set(r.id, {
      id: r.id,
      score: r.score * vectorWeight,
      metadata: r.metadata
    });
  }

  // Add keyword results
  for (const r of keywordResults) {
    const existing = combined.get(r.id) || { id: r.id, score: 0 };
    existing.score += r.score * keywordWeight;
    combined.set(r.id, existing);
  }

  // Sort by combined score
  return Array.from(combined.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}`,
      },
      {
        type: 'quiz',
        content: {
          q: 'Why chunk documents before embedding?',
          options: [
            'It\'s faster to embed many small vectors',
            'Whole-document embeddings are too coarse — chunks give precise matches',
            'Vector databases can\'t store large vectors',
          ],
          correct: 1,
          explain: 'A 50-page textbook\'s single embedding is an average of all topics. Chunking lets each piece have its own precise embedding.',
        } as Quiz,
      },
      {
        type: 'quiz',
        content: {
          q: 'What does cosine similarity measure?',
          options: [
            'The distance between two points in vector space',
            'The angle between two vectors',
            'The magnitude difference between vectors',
          ],
          correct: 1,
          explain: 'Cosine similarity measures the angle (1.0 = same direction, 0 = perpendicular/unrelated). This is why documents of different lengths can still be similar.',
        } as Quiz,
      },
    ],
  },
  {
    id: 'rag',
    emoji: '📚',
    title: 'RAG Architecture — Retrieval Augmented Generation',
    difficulty: 'medium',
    readTime: 32,
    tags: ['architecture', 'rag', 'production'],
    sections: [
      {
        type: 'card',
        variant: 'why',
        content: 'RAG is the single most important pattern in production LLM apps. It\'s how you ground responses in real data, reduce hallucinations, and give the model knowledge it never saw during training.',
      },
      {
        type: 'video',
        content: {
          youtubeId: 'T-D1OfcDW1M',
          title: 'What is Retrieval-Augmented Generation (RAG)?',
          description: 'IBM Technology explains the RAG framework with a memorable example, covering how retrieval grounds LLM responses.',
          duration: '4 min',
          creator: 'IBM Technology',
        } as VideoContent,
      },
      {
        type: 'heading',
        content: 'The Metaphor: Open-Book Exam',
        level: 2,
      },
      {
        type: 'card',
        variant: 'metaphor',
        content: 'Without RAG: The student answers from memory — might misremember or invent.\n\nWith RAG: The student gets relevant pages from a textbook before answering. They still do the reasoning — but it\'s grounded in verified text.',
      },
      {
        type: 'heading',
        content: 'The Full Pipeline',
        level: 2,
      },
      {
        type: 'pipeline',
        content: '',
      },
      {
        type: 'heading',
        content: 'How Chunking Shapes Retrieval',
        level: 2,
      },
      {
        type: 'image',
        content: {
          svg: `<svg viewBox="0 0 620 320" xmlns="http://www.w3.org/2000/svg">
  <rect width="620" height="320" fill="#0b1020"/>
  <!-- Long document -->
  <rect x="30" y="30" width="560" height="50" rx="6" fill="#5b8def20" stroke="#5b8def" stroke-width="2"/>
  <text x="310" y="60" text-anchor="middle" fill="#5b8def" font-size="12" font-weight="bold">Full medical textbook page (one giant embedding)</text>
  <line x1="310" y1="80" x2="310" y2="110" stroke="#5b8def" stroke-width="2" marker-end="url(#ch-arrow)"/>
  <text x="320" y="98" fill="#5b8def" font-size="10">❌ One fuzzy "average" vector — matches everything, helps nothing</text>
  <defs><marker id="ch-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#5b8def"/></marker></defs>
  <!-- Three chunks -->
  <rect x="30" y="125" width="180" height="80" rx="6" fill="#8b5cf620" stroke="#8b5cf6" stroke-width="2"/>
  <text x="120" y="148" text-anchor="middle" fill="#8b5cf6" font-size="11" font-weight="bold">Chunk A</text>
  <text x="120" y="167" text-anchor="middle" fill="#cbd5e1" font-size="9">"Malaria symptoms</text>
  <text x="120" y="179" text-anchor="middle" fill="#cbd5e1" font-size="9">include fever,</text>
  <text x="120" y="191" text-anchor="middle" fill="#cbd5e1" font-size="9">chills, sweating..."</text>
  <rect x="220" y="125" width="180" height="80" rx="6" fill="#2ccca020" stroke="#2ccca0" stroke-width="2"/>
  <text x="310" y="148" text-anchor="middle" fill="#2ccca0" font-size="11" font-weight="bold">Chunk B</text>
  <text x="310" y="167" text-anchor="middle" fill="#cbd5e1" font-size="9">"Differential for</text>
  <text x="310" y="179" text-anchor="middle" fill="#cbd5e1" font-size="9">travel-related fever</text>
  <text x="310" y="191" text-anchor="middle" fill="#cbd5e1" font-size="9">includes dengue..."</text>
  <rect x="410" y="125" width="180" height="80" rx="6" fill="#f59e0b20" stroke="#f59e0b" stroke-width="2"/>
  <text x="500" y="148" text-anchor="middle" fill="#f59e0b" font-size="11" font-weight="bold">Chunk C</text>
  <text x="500" y="167" text-anchor="middle" fill="#cbd5e1" font-size="9">"Treatment options</text>
  <text x="500" y="179" text-anchor="middle" fill="#cbd5e1" font-size="9">for P. falciparum:</text>
  <text x="500" y="191" text-anchor="middle" fill="#cbd5e1" font-size="9">ACT therapy..."</text>
  <!-- Query hits one chunk precisely -->
  <rect x="220" y="230" width="180" height="55" rx="8" fill="#5b8def20" stroke="#5b8def" stroke-width="2" stroke-dasharray="4,3"/>
  <text x="310" y="252" text-anchor="middle" fill="#5b8def" font-size="11" font-weight="bold">Query: "fever after travel?"</text>
  <text x="310" y="270" text-anchor="middle" fill="#cbd5e1" font-size="10">→ matches Chunk B precisely</text>
  <line x1="310" y1="210" x2="310" y2="225" stroke="#5b8def" stroke-width="2" stroke-dasharray="4,3"/>
</svg>`,
          caption: 'Chunking trade-off: one big embedding matches everything (useless); small chunks give precise matches',
        } as ImageContent,
      },
      {
        type: 'image',
        content: {
          svg: `<svg viewBox="0 0 620 280" xmlns="http://www.w3.org/2000/svg">
  <rect width="620" height="280" fill="#0b1020"/>
  <!-- Before -->
  <rect x="20" y="30" width="270" height="220" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="2"/>
  <text x="155" y="55" text-anchor="middle" fill="#ef4444" font-size="12" font-weight="bold">❌ Bad query embedding</text>
  <text x="155" y="80" text-anchor="middle" fill="#cbd5e1" font-size="10" font-style="italic">"my head hurts"</text>
  <!-- Scatter cluster of retrieved docs (poor) -->
  <g>
    <circle cx="60" cy="150" r="9" fill="#5b8def"/><text x="75" y="153" fill="#cbd5e1" font-size="9">chest pain</text>
    <circle cx="100" cy="170" r="9" fill="#5b8def"/><text x="115" y="173" fill="#cbd5e1" font-size="9">back pain</text>
    <circle cx="180" cy="120" r="9" fill="#5b8def"/><text x="195" y="123" fill="#cbd5e1" font-size="9">knee injury</text>
    <circle cx="240" cy="180" r="9" fill="#5b8def"/><text x="220" y="200" fill="#cbd5e1" font-size="9">stomach ache</text>
    <circle cx="130" cy="220" r="9" fill="#5b8def"/><text x="145" y="233" fill="#cbd5e1" font-size="9">allergy</text>
  </g>
  <text x="155" y="220" text-anchor="middle" fill="#ef4444" font-size="10">Retrieved: random pain topics, no relevance</text>
  <!-- After -->
  <rect x="330" y="30" width="270" height="220" rx="8" fill="#1e293b" stroke="#2ccca0" stroke-width="2"/>
  <text x="465" y="55" text-anchor="middle" fill="#2ccca0" font-size="12" font-weight="bold">✓ Rewritten query</text>
  <text x="465" y="80" text-anchor="middle" fill="#cbd5e1" font-size="10" font-style="italic">"headache symptoms causes"</text>
  <text x="465" y="92" text-anchor="middle" fill="#cbd5e1" font-size="10" font-style="italic">"treatment differential"</text>
  <!-- Tight cluster of relevant docs -->
  <g>
    <circle cx="465" cy="130" r="10" fill="#2ccca0"/><text x="425" y="133" fill="#cbd5e1" font-size="9">migraine</text>
    <circle cx="430" cy="160" r="10" fill="#2ccca0"/><text x="350" y="163" fill="#cbd5e1" font-size="9">tension headache</text>
    <circle cx="500" cy="160" r="10" fill="#2ccca0"/><text x="515" y="163" fill="#cbd5e1" font-size="9">cluster headache</text>
    <circle cx="465" cy="195" r="10" fill="#2ccca0"/><text x="380" y="208" fill="#cbd5e1" font-size="9">analgesic options</text>
  </g>
  <text x="465" y="230" text-anchor="middle" fill="#2ccca0" font-size="10">Retrieved: tightly relevant headache info</text>
</svg>`,
          caption: 'Query rewriting: vague patient language ("my head hurts") rarely matches medical embeddings. Rewrite to clinical terms before embedding.',
        } as ImageContent,
      },
      {
        type: 'heading',
        content: 'Naive RAG vs Advanced RAG',
        level: 2,
      },
      {
        type: 'paragraph',
        content: '**Naive RAG** (start here): Embed query → Find top-K chunks → Stuff into prompt → Answer. This is usually enough as a first iteration. **Advanced RAG** adds query rewriting, re-ranking, and hybrid search for the cases naive RAG misses — typically 10-30% of queries depending on your corpus and quality bar.',
      },
      {
        type: 'step',
        content: {
          title: 'Advanced RAG Patterns',
          steps: [
            { label: 'Query rewriting', detail: 'Rewrite vague queries before embedding. "my head hurts" → "headache symptoms causes treatment"' },
            { label: 'HyDE', detail: 'Hypothetical Document Embeddings — generate a fake ideal answer, embed it, retrieve docs similar to the ideal' },
            { label: 'Re-ranking', detail: 'Use a cross-encoder to re-score top-50 from vector DB down to top-5 most relevant. A cross-encoder reads the (query, doc) pair together and outputs a relevance score — slower per pair than vector search, but much more accurate, so it\'s worth it as a second pass after the fast vector retrieval.' },
            { label: 'Hybrid search', detail: 'Combine vector similarity with BM25 keyword search for medical terms/drug names' },
            { label: 'Multi-query', detail: 'Generate 3-5 query variants, retrieve for each, deduplicate results. Example: \'I have a fever\' → variants: \'fever symptoms\', \'causes of fever\', \'fever treatment\' — each retrieves different docs, and the union covers more ground than the original alone.' },
          ],
        } as StepContent,
      },
      {
        type: 'callout',
        variant: 'warning',
        content: '**Common RAG failure modes:**\n• Wrong chunks retrieved (query embedding doesn\'t match relevant docs)\n• Hallucination despite context (model ignores retrieved docs)\n• "Lost in the middle" (model ignores content in middle of long context)',
      },
      {
        type: 'heading',
        content: 'HyDE: Retrieve by Ideal Answer',
        level: 2,
      },
      {
        type: 'image',
        content: {
          svg: `<svg viewBox="0 0 620 280" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="hyde-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#5b8def"/></marker></defs>
  <rect width="620" height="280" fill="#0b1020"/>
  <!-- Step 1: short query -->
  <rect x="20" y="110" width="140" height="60" rx="8" fill="#5b8def20" stroke="#5b8def" stroke-width="2"/>
  <text x="90" y="135" text-anchor="middle" fill="#5b8def" font-size="11" font-weight="bold">Short query</text>
  <text x="90" y="155" text-anchor="middle" fill="#cbd5e1" font-size="10">"malaria treatment"</text>
  <line x1="160" y1="140" x2="200" y2="140" stroke="#5b8def" stroke-width="2" marker-end="url(#hyde-arrow)"/>
  <!-- Step 2: LLM generates fake ideal answer -->
  <rect x="200" y="100" width="160" height="80" rx="8" fill="#8b5cf620" stroke="#8b5cf6" stroke-width="2"/>
  <text x="280" y="125" text-anchor="middle" fill="#8b5cf6" font-size="11" font-weight="bold">LLM generates fake</text>
  <text x="280" y="142" text-anchor="middle" fill="#8b5cf6" font-size="11" font-weight="bold">ideal answer</text>
  <text x="280" y="160" text-anchor="middle" fill="#cbd5e1" font-size="9">"First-line treatment for</text>
  <text x="280" y="172" text-anchor="middle" fill="#cbd5e1" font-size="9">P. falciparum malaria is</text>
  <text x="280" y="184" text-anchor="middle" fill="#cbd5e1" font-size="9">artemisinin-based..."</text>
  <line x1="360" y1="140" x2="400" y2="140" stroke="#5b8def" stroke-width="2" marker-end="url(#hyde-arrow)"/>
  <!-- Step 3: embed fake answer -->
  <rect x="400" y="110" width="100" height="60" rx="8" fill="#f59e0b20" stroke="#f59e0b" stroke-width="2"/>
  <text x="450" y="135" text-anchor="middle" fill="#f59e0b" font-size="11" font-weight="bold">Embed fake</text>
  <text x="450" y="155" text-anchor="middle" fill="#cbd5e1" font-size="10">(vector)</text>
  <line x1="500" y1="140" x2="540" y2="140" stroke="#5b8def" stroke-width="2" marker-end="url(#hyde-arrow)"/>
  <!-- Step 4: retrieve real docs similar to fake -->
  <rect x="540" y="100" width="70" height="80" rx="8" fill="#2ccca020" stroke="#2ccca0" stroke-width="2"/>
  <text x="575" y="125" text-anchor="middle" fill="#2ccca0" font-size="11" font-weight="bold">Real</text>
  <text x="575" y="142" text-anchor="middle" fill="#2ccca0" font-size="11" font-weight="bold">docs</text>
  <text x="575" y="160" text-anchor="middle" fill="#cbd5e1" font-size="9">ACT</text>
  <text x="575" y="172" text-anchor="middle" fill="#cbd5e1" font-size="9">guideline</text>
  <!-- Why it works -->
  <text x="310" y="40" text-anchor="middle" fill="#5b8def" font-size="11" font-weight="bold">HyDE = Hypothetical Document Embeddings</text>
  <text x="310" y="230" text-anchor="middle" fill="#cbd5e1" font-size="10" font-style="italic">Why it works: real docs and ideal answers live close in embedding space.</text>
  <text x="310" y="248" text-anchor="middle" fill="#cbd5e1" font-size="10" font-style="italic">The fake answer is more "doc-like" than the bare query.</text>
</svg>`,
          caption: 'HyDE: generate a fake ideal answer, embed it, retrieve real docs similar to that answer',
        } as ImageContent,
      },
      {
        type: 'heading',
        content: 'The "Lost in the Middle" Problem',
        level: 2,
      },
      {
        type: 'image',
        content: {
          svg: `<svg viewBox="0 0 620 320" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="attention-grad" x1="0%" y1="0%" x2="100%" y2="0%">
  <stop offset="0%" stop-color="#2ccca0" stop-opacity="0.9"/>
  <stop offset="50%" stop-color="#ef4444" stop-opacity="0.9"/>
  <stop offset="100%" stop-color="#2ccca0" stop-opacity="0.9"/>
  </linearGradient></defs>
  <rect width="620" height="320" fill="#0b1020"/>
  <text x="310" y="30" text-anchor="middle" fill="#5b8def" font-size="13" font-weight="bold">Attention is U-shaped, not flat</text>
  <text x="310" y="48" text-anchor="middle" fill="#cbd5e1" font-size="10" font-style="italic">Models pay more attention to the start and end of long context, less to the middle</text>
  <!-- Long context bars -->
  <g font-size="9" fill="#cbd5e1" text-anchor="middle">
  <rect x="30" y="100" width="50" height="40" fill="#2ccca0" opacity="0.9"/><text x="55" y="124">system</text>
  <rect x="85" y="100" width="50" height="40" fill="#2ccca0" opacity="0.4"/><text x="110" y="124">doc 1</text>
  <rect x="140" y="100" width="50" height="40" fill="#ef4444" opacity="0.3"/><text x="165" y="124">doc 2</text>
  <rect x="195" y="100" width="50" height="40" fill="#ef4444" opacity="0.25"/><text x="220" y="124">doc 3</text>
  <rect x="250" y="100" width="50" height="40" fill="#ef4444" opacity="0.3"/><text x="275" y="124">doc 4</text>
  <rect x="305" y="100" width="50" height="40" fill="#ef4444" opacity="0.35"/><text x="330" y="124">doc 5</text>
  <rect x="360" y="100" width="50" height="40" fill="#ef4444" opacity="0.4"/><text x="385" y="124">doc 6</text>
  <rect x="415" y="100" width="50" height="40" fill="#ef4444" opacity="0.45"/><text x="440" y="124">doc 7</text>
  <rect x="470" y="100" width="50" height="40" fill="#2ccca0" opacity="0.7"/><text x="495" y="124">doc 8</text>
  <rect x="525" y="100" width="50" height="40" fill="#2ccca0" opacity="0.95"/><text x="550" y="124">question</text>
  </g>
  <!-- Attention curve overlay -->
  <path d="M30,210 Q310,290 590,210" fill="none" stroke="url(#attention-grad)" stroke-width="3"/>
  <text x="310" y="280" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="bold">⚠️ The most important retrieved doc is often in the middle</text>
  <text x="310" y="298" text-anchor="middle" fill="#cbd5e1" font-size="10">Fix: re-rank so best chunks go top/bottom, or compress context</text>
</svg>`,
          caption: '"Lost in the middle": retrieved docs in the middle of context get less model attention than ones at the edges',
        } as ImageContent,
      },
      {
        type: 'image',
        content: {
          svg: `<svg viewBox="0 0 620 280" xmlns="http://www.w3.org/2000/svg">
  <rect width="620" height="280" fill="#0b1020"/>
  <text x="310" y="25" text-anchor="middle" fill="#5b8def" font-size="13" font-weight="bold">Embedding space: medical queries cluster by topic</text>
  <!-- Axes -->
  <line x1="40" y1="240" x2="580" y2="240" stroke="#475569" stroke-width="1"/>
  <line x1="60" y1="50" x2="60" y2="240" stroke="#475569" stroke-width="1"/>
  <text x="580" y="255" text-anchor="end" fill="#cbd5e1" font-size="9">→ "symptom vs. drug" axis</text>
  <text x="65" y="55" fill="#cbd5e1" font-size="9">↑ "severity" axis</text>
  <!-- Cluster 1: headache -->
  <circle cx="160" cy="170" r="40" fill="#5b8def" opacity="0.12"/>
  <circle cx="150" cy="165" r="6" fill="#5b8def"/><text x="160" y="168" fill="#cbd5e1" font-size="9">"headache"</text>
  <circle cx="180" cy="180" r="6" fill="#5b8def"/><text x="190" y="183" fill="#cbd5e1" font-size="9">"migraine"</text>
  <circle cx="145" cy="190" r="6" fill="#5b8def"/><text x="155" y="193" fill="#cbd5e1" font-size="9">"tension HA"</text>
  <text x="160" y="220" text-anchor="middle" fill="#5b8def" font-size="10" font-weight="bold">headache cluster</text>
  <!-- Cluster 2: cardiac -->
  <circle cx="380" cy="100" r="45" fill="#ef4444" opacity="0.12"/>
  <circle cx="370" cy="95" r="6" fill="#ef4444"/><text x="380" y="98" fill="#cbd5e1" font-size="9">"chest pain"</text>
  <circle cx="395" cy="110" r="6" fill="#ef4444"/><text x="405" y="113" fill="#cbd5e1" font-size="9">"palpitations"</text>
  <circle cx="380" cy="125" r="6" fill="#ef4444"/><text x="390" y="128" fill="#cbd5e1" font-size="9">"angina"</text>
  <text x="380" y="155" text-anchor="middle" fill="#ef4444" font-size="10" font-weight="bold">cardiac cluster (higher severity)</text>
  <!-- Cluster 3: GI -->
  <circle cx="490" cy="200" r="40" fill="#2ccca0" opacity="0.12"/>
  <circle cx="480" cy="195" r="6" fill="#2ccca0"/><text x="490" y="198" fill="#cbd5e1" font-size="9">"nausea"</text>
  <circle cx="505" cy="210" r="6" fill="#2ccca0"/><text x="500" y="225" fill="#cbd5e1" font-size="9">"diarrhea"</text>
  <text x="490" y="245" text-anchor="middle" fill="#2ccca0" font-size="10" font-weight="bold">GI cluster</text>
  <!-- Query marker (mid-flight) -->
  <circle cx="160" cy="170" r="10" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3,2"/>
  <text x="160" y="115" text-anchor="middle" fill="#f59e0b" font-size="10" font-weight="bold">query "my head hurts"</text>
  <line x1="160" y1="120" x2="160" y2="158" stroke="#f59e0b" stroke-width="1" stroke-dasharray="3,2"/>
</svg>`,
          caption: 'Medical queries naturally cluster by topic in embedding space — retrieval finds the nearest cluster',
        } as ImageContent,
      },
      {
        type: 'heading',
        content: 'RAG vs Fine-Tuning',
        level: 2,
      },
      {
        type: 'table',
        content: {
          headers: ['Aspect', 'RAG', 'Fine-Tuning', 'Use Both When'],
          rows: [
            ['Knowledge updates', 'Instant (just update docs)', 'Requires re-training', 'RAG for frequent updates'],
            ['Source attribution', 'Yes (citations)', 'No', 'RAG when citations needed'],
            ['Style adaptation', 'Limited', 'Excellent', 'Fine-tune for tone/voice'],
            ['Cost', 'Low (API calls)', 'High (GPU hours)', 'RAG for most use cases'],
            ['Latency', '~500ms retrieval + generation', 'Generation only', 'Fine-tune for latency-critical'],
          ],
          caption: 'RAG vs Fine-tuning decision matrix',
        } as TableContent,
      },
      {
        type: 'callout',
        variant: 'tip',
        content: '**Domain adaptation ≠ domain knowledge.** Use fine-tuning to teach the model *style* (e.g. to write discharge summaries in your hospital\'s format) — the model already knows medical jargon from pretraining. Use RAG to feed it *facts* (current guidelines, patient-specific data). A common mistake is fine-tuning the model on a hospital\'s full guideline library — that gets stale the moment the guidelines update, and you can never trace why the model said what it said. RAG gives you citations and instant updates.',
      },
      {
        type: 'code',
        content: `// Complete RAG implementation
async function answerWithRAG(userQuery, conversationHistory) {
  // 1. Embed the query
  const queryEmbedding = await embed(userQuery);

  // 2. Retrieve top-K chunks
  const retrieved = await pinecone.query({
    vector: queryEmbedding,
    topK: 5,
    includeMetadata: true,
  });

  // 3. Build context string with citations
  const context = retrieved.matches
    .map((m, i) => \`[\${i + 1}] \${m.metadata.title}\\n\${m.metadata.text}\`)
    .join('\\n\\n');

  // 4. Construct prompt
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...conversationHistory,
    { role: 'user', content: \`
Based ONLY on the following medical context, answer the patient's question.
Cite sources like [1], [2]. If context doesn't contain the answer, say so.

Context:
\${context}

Patient question: \${userQuery}\`},
  ];

  // 5. Stream response
  return await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0,
    messages,
    stream: true,
  });
}`,
      },
      {
        type: 'heading',
        content: 'RAG Evaluation Metrics',
        level: 2,
      },
      {
        type: 'paragraph',
        content: 'To measure RAG quality, track: **Context relevancy** (are retrieved docs relevant?), **Faithfulness** (is answer grounded in context?), and **Answer relevancy** (does answer address the query?).',
      },
      {
        type: 'quiz',
        content: {
          q: 'What is the primary reason RAG reduces hallucinations?',
          options: [
            'The model is more powerful when paired with RAG',
            'The model is constrained to use retrieved evidence',
            'The vector database has a built-in fact-checker',
          ],
          correct: 1,
          explain: 'RAG constrains the model\'s answer to be grounded in real text you\'ve provided.',
        } as Quiz,
      },
      {
        type: 'quiz',
        content: {
          q: 'What is HyDE in advanced RAG?',
          options: [
            'A method to hide document embeddings',
            'Generate a hypothetical answer, embed it, retrieve similar docs',
            'A type of vector database',
          ],
          correct: 1,
          explain: 'HyDE (Hypothetical Document Embeddings) generates a fake ideal answer first, then uses that embedding to find similar real documents.',
        } as Quiz,
      },
    ],
  },
  {
    id: 'function-calling',
    emoji: '🔧',
    title: 'Function / Tool Calling',
    difficulty: 'medium',
    readTime: 22,
    tags: ['architecture', 'production', 'agents'],
    sections: [
      {
        type: 'card',
        variant: 'why',
        content: 'An LLM in a vacuum can only output text. Function calling is the bridge — it lets the model decide which tool to use, generate the arguments, and use the tool\'s response in its next response.',
      },
      {
        type: 'video',
        content: {
          youtubeId: 'aqdWSYWC_LI',
          title: 'OpenAI Function Calling — Full Beginner Tutorial',
          description: 'Walkthrough of function calling with practical examples using the OpenAI API.',
          duration: '28 min',
          creator: 'Dave Ebbelaar',
        } as VideoContent,
      },
      {
        type: 'heading',
        content: 'The Metaphor: Ordering Food via a Waiter',
        level: 2,
      },
      {
        type: 'card',
        variant: 'metaphor',
        content: 'You tell the waiter what you want in plain language. The waiter translates into a precise kitchen order. The kitchen makes it. The waiter brings it back.\n\nFunction calling: LLM is the customer. You define the menu (tools). The model tells you which tool to call.',
      },
      {
        type: 'heading',
        content: 'Defining Tool Schemas',
        level: 2,
      },
      {
        type: 'paragraph',
        content: 'Every tool you expose needs a clear JSON schema with name, description, and parameters. The description is critical — the model picks tools based on these descriptions.',
      },
      {
        type: 'code',
        content: `const tools = [
  {
    type: 'function',
    function: {
      name: 'search_doctors',
      description: 'Search for doctors by specialty and language. Use when patient needs to see a specific kind of doctor.',
      parameters: {
        type: 'object',
        properties: {
          specialty: {
            type: 'string',
            enum: ['general', 'dermatology', 'cardiology', 'pediatrics'],
            description: 'Medical specialty required',
          },
          language: {
            type: 'string',
            description: 'Preferred language, e.g. "Hindi", "English"',
          },
          date: {
            type: "string",
            description: "YYYY-MM-DD",
          },
        },
        required: ['specialty', 'date'],
      },
    },
  },
];`,
      },
      {
        type: 'heading',
        content: 'Multi-Tool Orchestration',
        level: 2,
      },
      {
        type: 'paragraph',
        content: 'The model can call multiple tools in sequence. It generates a tool call, you execute it, return the result, and the model continues. This loop enables complex workflows.',
      },
      {
        type: 'step',
        content: {
          title: 'The Agentic Loop',
          steps: [
            { label: 'Model receives user request', detail: '"I need a cardiologist tomorrow afternoon"' },
            { label: 'Model decides to call tool', detail: 'Generates tool_call: search_doctors({specialty: "cardiology", date: "2024-06-21"})' },
            { label: 'Backend executes tool', detail: 'Queries MongoDB for cardiologists, returns 3 results' },
            { label: 'Model sees tool result', detail: 'Continues reasoning with the doctor list' },
            { label: 'Model may call another tool', detail: 'check_availability({doctor_id: "123", date: "2024-06-21"})' },
            { label: 'Loop until done', detail: 'Model generates final response when no more tools needed' },
          ],
        } as StepContent,
      },
      {
        type: 'table',
        content: {
          headers: ['Provider', 'Name', 'Parallel Calls', 'Streaming'],
          rows: [
            ['OpenAI', 'Function Calling', 'Yes', 'Yes'],
            ['Anthropic', 'Tool Use', 'Yes', 'Yes'],
            ['Google', 'Function Calling', 'Yes', 'Yes'],
            ['Meta (Llama)', 'Tool calling via prompt', 'Manual', 'Yes'],
          ],
          caption: 'Function calling support across providers',
        } as TableContent,
      },
      {
        type: 'callout',
        variant: 'tip',
        content: '**OpenAI gotcha:** parallel tool calls are disabled in `json_schema` response_format mode unless you explicitly set `parallel_tool_calls: true` in the request. If you turn on structured outputs and your parallel-call evals regress, this is why.',
      },
      {
        type: 'callout',
        variant: 'warning',
        content: '**When NOT to use function calling:** For simple Q&A with no external data needs, direct generation is faster and cheaper. Only use tools when you need real-time data or side effects.',
      },
      {
        type: 'heading',
        content: 'Vaidya-Assist Tool Examples',
        level: 2,
      },
      {
        type: 'code',
        content: `// Vaidya-Assist tool registry
const tools = [
  {
    type: 'function',
    function: {
      name: 'search_doctors',
      description: 'Search for doctors by specialty and language.',
      parameters: {
        type: 'object',
        properties: {
          specialty: { type: 'string', enum: ['general', 'dermatology', 'cardiology', 'pediatrics', 'orthopedics'] },
          language: { type: 'string', description: 'Preferred language' },
        },
        required: ['specialty'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'check_availability',
      description: 'Check open appointment slots for a doctor.',
      parameters: {
        type: 'object',
        properties: {
          doctor_id: { type: 'string' },
          date: { type: 'string', description: 'YYYY-MM-DD' },
        },
        required: ['doctor_id', 'date'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'book_appointment',
      description: 'Book a specific appointment slot.',
      parameters: {
        type: 'object',
        properties: {
          slot_id: { type: 'string' },
          patient_id: { type: 'string' },
        },
        required: ['slot_id', 'patient_id'],
      },
    },
  },
];`,
      },
      {
        type: 'quiz',
        content: {
          q: 'Why is function calling safer than free-form text?',
          options: [
            'Tools run faster than text generation',
            'The model can only invoke pre-approved schemas',
            'Tools cost less',
          ],
          correct: 1,
          explain: 'Function calling constrains the model to pre-approved operations.',
        } as Quiz,
      },
      {
        type: 'quiz',
        content: {
          q: 'What is an agentic workflow?',
          options: [
            'A single LLM call with a complex prompt',
            'A loop where the model reasons, calls tools, observes results, and repeats',
            'Multiple LLMs working in parallel',
          ],
          correct: 1,
          explain: 'Agentic workflows alternate between thinking (reasoning) and acting (tool calls) until the task is complete.',
        } as Quiz,
      },
    ],
  },
  {
    id: 'evaluation',
    emoji: '📊',
    title: 'Evaluation — How You Know It Actually Works',
    difficulty: 'hard',
    readTime: 22,
    tags: ['production', 'quality', 'testing'],
    sections: [
      {
        type: 'card',
        variant: 'why',
        content: '"Vibe-checking" — sending 5 test prompts and seeing it works — is how junior AI engineers ship. Senior AI engineers build eval harnesses.',
      },
      {
        type: 'video',
        content: {
          youtubeId: 'JpAxdTWQJxM',
          title: 'Stanford CS336 — Lecture 12: Evaluation',
          description: 'Tatsunori Hashimoto and Percy Liang cover LLM evaluation: perplexity, benchmarks, and human evals.',
          duration: '1 hour 30 min',
          creator: 'Stanford Online',
        } as VideoContent,
      },
      {
        type: 'heading',
        content: 'The Three Layers of Evaluation',
        level: 2,
      },
      {
        type: 'heading',
        content: '1. Component-Level Evals (Fast, Deterministic)',
        level: 3,
      },
      {
        type: 'list',
        content: '**Intent classifier:** 30+ labeled queries → accuracy?\n\n**Retrieval:** 30+ queries with known docs → recall@5 (of all relevant docs, how many appear in the top-5 retrieved)?\n\n**Guardrails:** 50+ adversarial inputs → caught?\n\n**PII detector:** 30+ synthetic inputs with emails/phones → all redacted?',
      },
      {
        type: 'heading',
        content: '2. End-to-End Evals (Slower, Expensive)',
        level: 3,
      },
      {
        type: 'paragraph',
        content: '50+ realistic conversations → does the final response contain the expected info? Score with exact match, key-fact presence, LLM-as-judge, or human review.',
      },
      {
        type: 'heading',
        content: '3. Production Evals (Continuous)',
        level: 3,
      },
      {
        type: 'paragraph',
        content: 'Sample 1% of real conversations → have an LLM judge rate them. Track: did the user book an appointment afterward? (proxy for quality). Track: did the user re-ask the same question? (signal of unhelpful response).',
      },
      {
        type: 'heading',
        content: 'LLM-as-Judge Patterns',
        level: 2,
      },
      {
        type: 'paragraph',
        content: 'LLM-as-judge works by asking a strong LLM to grade the output of another LLM based on a rubric. It\'s how most modern eval pipelines work. **Known biases to watch for:** (1) **verbosity bias** — the judge prefers longer answers, even when shorter is better; (2) **position bias** — the first or last option in a multiple-choice comparison gets an unfair edge; (3) **self-preference bias** — a GPT-4 judge tends to rate GPT-4 outputs higher than equivalent Claude outputs. Calibrate your judge against a small set of human-rated examples, then spot-check quarterly for drift.',
      },
      {
        type: 'code',
        content: `// Use structured outputs to guarantee parseable, schema-valid results
const judgeSchema = {
  type: "object",
  properties: {
    score: { type: "integer", minimum: 1, maximum: 5 },
    reasoning: { type: "string" },
    issues: { type: "array", items: { type: "string" } },
  },
  required: ["score", "reasoning", "issues"],
  additionalProperties: false,
};

const result = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  response_format: {
    type: "json_schema",
    json_schema: { name: "judge_result", strict: true, schema: judgeSchema },
  },
  messages: [
    {
      role: "system",
      content: "You are an expert evaluator. Score the assistant's response from 1-5 based on accuracy, helpfulness, and safety.",
    },
    { role: "user", content: \`Question: \${question}\nResponse: \${response}\` },
  ],
});
// result.choices[0].message.content is guaranteed valid JSON matching judgeSchema
const parsed = JSON.parse(result.choices[0].message.content);`,
      },
      {
        type: 'table',
        content: {
          headers: ['Metric', 'Type', 'Range', 'When to Use'],
          rows: [
            ['Exact match', 'String comparison', '0-100%', 'When there\'s one correct answer'],
            ['Key-fact presence', 'Keyword check', '0-100%', 'When specific facts must be present'],
            ['BLEU/ROUGE', 'N-gram overlap', '0-1', 'Translation/summarization tasks'],
            ['BERTScore', 'Semantic similarity', '0-1', 'When meaning matters more than words'],
            ['LLM-judge', 'AI grading', '1-5 scale', 'Nuanced quality (empathy, accuracy)'],
            ['Human eval', 'Human grading', '1-5 scale', 'Gold standard, expensive'],
          ],
          caption: 'Evaluation metrics comparison — pick based on task type',
        } as TableContent,
      },
      {
        type: 'callout',
        variant: 'tip',
        content: '**BERTScore** uses an embedding model (see the embeddings topic) to compare meaning rather than exact words. It correlates better with human judgment than BLEU/ROUGE for many tasks, but is more expensive to compute.',
      },
      {
        type: 'callout',
        variant: 'info',
        content: '**The eval paradox — evaluating your evaluator:** Your LLM-judge can develop biases (preferring verbose answers, specific styles). Always spot-check LLM-judge scores against human ratings.',
      },
      {
        type: 'heading',
        content: 'Building an Eval Harness',
        level: 2,
      },
      {
        type: 'step',
        content: {
          title: 'Setting Up Continuous Evaluation',
          steps: [
            { label: 'Create eval dataset', detail: '30+ cases per component with expected outputs' },
            { label: 'Write scoring functions', detail: 'Exact match, key-fact presence, LLM-judge prompts' },
            { label: 'Build runner script', detail: 'Run pipeline on dataset, collect scores' },
            { label: 'Add to CI/CD', detail: 'Fail deployment if scores drop below threshold' },
            { label: 'Track over time', detail: 'Log scores to dashboard, alert on regressions' },
          ],
        } as StepContent,
      },
      {
        type: 'quiz',
        content: {
          q: 'What is the minimum viable eval dataset size?',
          options: [
            '5 cases is enough to verify it works',
            '30+ cases per component — 5 is anecdote',
            '1000+ cases for statistical significance',
          ],
          correct: 1,
          explain: '30+ cases gives you a sample. 5 is anecdote and won\'t catch edge cases.',
        } as Quiz,
      },
      {
        type: 'quiz',
        content: {
          q: 'What is faithfulness in RAG evaluation?',
          options: [
            'Whether the answer is grammatically correct',
            'Whether the answer is grounded in and consistent with retrieved context',
            'Whether the answer cites sources correctly',
          ],
          correct: 1,
          explain: 'Faithfulness measures if the answer hallucinates beyond what the retrieved context supports.',
        } as Quiz,
      },
    ],
  },
  {
    id: 'production',
    emoji: '🛡️',
    title: 'Production Concerns — Guardrails, Observability, Cost',
    difficulty: 'hard',
    readTime: 25,
    tags: ['production', 'senior', 'devops'],
    sections: [
      {
        type: 'card',
        variant: 'why',
        content: 'A demo that works on your laptop is 10% of the work. The other 90% is: what happens when 10,000 patients hit it at once? When someone tries prompt injection? When you wake up to a $5,000 bill?',
      },
      {
        type: 'video',
        content: {
          youtubeId: 'ql2ZdyktmOA',
          title: 'An LLM Evaluation Framework for High-Stakes AI',
          description: 'CMU SEI podcast covering the ELM evaluation library, eval-driven development, and production-grade LLM quality.',
          duration: '52 min',
          creator: 'Carnegie Mellon SEI',
        } as VideoContent,
      },
      {
        type: 'heading',
        content: 'Guardrails — The Safety Layer',
        level: 2,
      },
      {
        type: 'heading',
        content: 'Input Guardrails',
        level: 3,
      },
      {
        type: 'list',
        content: '**Emergency detection:** chest pain, stroke → redirect to emergency (runs BEFORE LLM)\n\n**PII detection:** flag emails, phone numbers before logging\n\n**Prompt injection detection:** patterns like "ignore previous instructions"\n\n**Length limits:** cap user input to prevent token abuse\n\n**Rate limiting:** per-user and per-IP limits',
      },
      {
        type: 'heading',
        content: 'Output Guardrails',
        level: 3,
      },
      {
        type: 'list',
        content: '**Medical disclaimer:** append "I\'m an AI, not a doctor" to every response\n\n**PII redaction:** strip any PII the model echoed\n\n**Refuse-and-escalate:** if confidence is low, recommend seeing a doctor',
      },
      {
        type: 'code',
        content: `const EMERGENCY_PATTERNS = [
  /\\b(chest pain|chest pressure|crushing chest)\\b/i,
  /\\b(can('?| no)t breathe|short(ness)? of breath)\\b/i,
  /\\b(stroke|face drooping|sudden severe headache)\\b/i,
  /\\b(suicid|kill myself|end my life)\\b/i,
  /\\b(unconscious|seizure|heavy bleeding)\\b/i,
];

function checkEmergency(text) {
  for (const pattern of EMERGENCY_PATTERNS) {
    if (pattern.test(text)) {
      return {
        isEmergency: true,
        response: '⚠️ This sounds like a medical emergency. Please call 112 immediately.',
      };
    }
  }
  return { isEmergency: false };
}`,
      },
      {
        type: 'heading',
        content: 'Observability — Log Everything',
        level: 2,
      },
      {
        type: 'paragraph',
        content: 'When a user says "the AI told me something weird yesterday," you need to answer this in 30 seconds. Log: input text, retrieved doc IDs, final prompt, model, tokens in/out, cost, latency at each stage, output text, user feedback.',
      },
      {
        type: 'callout',
        variant: 'tip',
        content: '**Tools:** LangSmith (easiest), Helicone (cheaper), or self-host with structured JSON logs. Always sanitize PII before logging.',
      },
      {
        type: 'heading',
        content: 'Cost Optimization Levers',
        level: 2,
      },
      {
        type: 'paragraph',
        content: 'Cheaper models for cheap tasks (gpt-4o-mini for intent classification). Caching (exact-match and semantic). Token discipline (trim history, retrieve top-3 not top-10, use max_tokens).',
      },
      {
        type: 'callout',
        variant: 'warning',
        content: '**For clinical / HIPAA-regulated use:** the standard OpenAI API does NOT sign a BAA and is not HIPAA-eligible. The gpt-4o-mini examples here are for non-clinical prototyping only. Production medical deployments need Azure OpenAI Service or AWS Bedrock in a HIPAA-eligible configuration.',
      },
      {
        type: 'table',
        content: {
          headers: ['Optimization', 'Savings', 'Complexity', 'When to Use'],
          rows: [
            ['Model routing', 'Typically 30-70%', 'Low', 'Route simple tasks to cheaper models — savings depend on query distribution'],
            ['Exact-match cache', 'Typically 10-30%', 'Low', 'Cache identical queries — only helps for repeated identical queries'],
            ['Semantic cache', 'Typically 20-40%', 'Medium', 'Cache similar queries — helps when users ask the same question in different words'],
            ['Prompt compression', 'Typically 20-50%', 'Medium', 'Trim context without losing info — depends on the compressor and how lossy you are willing to make context'],
            ['Response length limits', 'Roughly 20-40%', 'Low', 'Set max_tokens appropriately'],
          ],
          caption: 'Cost optimization strategies — start with model routing. Savings vary widely by workload.',
        } as TableContent,
      },
      {
        type: 'callout',
        variant: 'warning',
        content: '**The $5,000 bill story:** A startup forgot to set spending limits and rate limits. A script kiddie found their endpoint and ran 100K queries overnight. Always set OpenAI spending alerts at 50%, 80%, 100%.',
      },
      {
        type: 'heading',
        content: 'Production Checklist',
        level: 2,
      },
      {
        type: 'step',
        content: {
          title: 'Pre-Launch Checklist',
          steps: [
            { label: 'Emergency guardrail tested', detail: '50+ adversarial inputs, 100% detection required' },
            { label: 'PII redaction verified', detail: 'Synthetic data with emails/phones, all redacted' },
            { label: 'Eval pass rate ≥85%', detail: 'Run full eval suite, must pass threshold' },
            { label: 'p95 latency <5s', detail: 'Load test with 100 concurrent users — full RAG + generation pipeline' },
            { label: 'p95 TTFT <1s', detail: 'Time to first token < 1s — the metric that determines perceived chat responsiveness' },
            { label: 'Cost per conversation <$0.02', detail: 'Measure real cost, optimize if higher' },
            { label: 'Retry logic verified', detail: 'Simulate API failures, verify graceful degradation' },
            { label: 'Rate limiting active', detail: '60 msgs/user/hour, 1000 msgs/IP/hour' },
            { label: 'Spending limit set', detail: 'Alert at 50%, hard limit at budget' },
          ],
        } as StepContent,
      },
      {
        type: 'quiz',
        content: {
          q: 'Where should emergency-symptom detection live?',
          options: [
            'Inside the LLM\'s system prompt',
            'Before the LLM is called — as hardcoded rules',
            'In the frontend before submit',
          ],
          correct: 1,
          explain: 'A prompt instruction is a soft suggestion. A hardcoded guardrail is a hard constraint.',
        } as Quiz,
      },
      {
        type: 'quiz',
        content: {
          q: 'What is semantic caching?',
          options: [
            'Caching responses for exact duplicate queries',
            'Caching responses for semantically similar (not identical) queries',
            'Compressing cached responses to save space',
          ],
          correct: 1,
          explain: 'Semantic caching uses embeddings to find similar (not identical) queries and returns cached responses. Saves ~20-30% of calls.',
        } as Quiz,
      },
    ],
  },
  // ========== NEW TOPICS ==========
  {
    id: 'ai-agents',
    emoji: '🤖',
    title: 'AI Agents & Multi-Agent Systems',
    difficulty: 'hard',
    readTime: 20,
    tags: ['advanced', 'agents', 'architecture'],
    sections: [
      {
        type: 'card',
        variant: 'why',
        content: 'Single LLM calls are limited. Agents can plan, use tools, and collaborate. Multi-agent systems can tackle complex workflows that would overwhelm a single model.',
      },
      {
        type: 'video',
        content: {
          youtubeId: 'qc42uJsAACo',
          title: 'How I Use LLMs (Agents, Vibe Coding, and Software 3.0)',
          description: 'Andrej Karpathy on how LLMs evolved from autocomplete to agents, with deep dives into reasoning, agents, and practical workflows.',
          duration: '3 hour 20 min',
          creator: 'Andrej Karpathy',
        } as VideoContent,
      },
      {
        type: 'heading',
        content: 'The ReAct Pattern',
        level: 2,
      },
      {
        type: 'paragraph',
        content: '**ReAct (Reason + Act)**, which we introduced in the prompt-engineering topic as a text-based pattern, is what production agents look like under the hood. Here\'s the actual implementation:',
      },
      {
        type: 'code',
        content: `// ReAct loop implementation
async function runAgent(userMessage, tools, maxIterations = 10) {
  const messages = [
    { role: 'system', content: AGENT_SYSTEM_PROMPT },
    { role: 'user', content: userMessage },
  ];

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    // Model thinks and decides on action
    const response = await llm.create({
      messages,
      tools,
      tool_choice: 'auto',
    });

    const msg = response.choices[0].message;
    messages.push(msg);

    // If no tool calls, we're done - model is responding
    if (!msg.tool_calls) {
      return msg.content;
    }

    // Execute each tool and add results to conversation
    for (const call of msg.tool_calls) {
      const result = await executeTool(call.function.name, JSON.parse(call.function.arguments));
      messages.push({
        role: 'tool',
        tool_call_id: call.id,
        content: JSON.stringify(result),
      });
    }
  }

  throw new Error('Agent exceeded max iterations');
}`,
      },
      {
        type: 'heading',
        content: 'Planning & Decomposition',
        level: 2,
      },
      {
        type: 'paragraph',
        content: 'Advanced agents can break complex tasks into subtasks. "Book me a full health checkup" decomposes into: find available specialists → check each schedule → find common slot → book all appointments.',
      },
      {
        type: 'callout',
        variant: 'tip',
        content: '**Prompt for planning:** "Break this task into subtasks. For each subtask, list what information you need and what tools you\'ll use." This forces explicit planning before action.',
      },
      {
        type: 'heading',
        content: 'Multi-Agent Architectures',
        level: 2,
      },
      {
        type: 'paragraph',
        content: 'Multiple agents can collaborate: one handles medical triage, another handles appointment booking, a third handles billing. Each agent has specialized knowledge and tools.',
      },
      {
        type: 'table',
        content: {
          headers: ['Pattern', 'Description', 'When to Use', 'Example'],
          rows: [
            ['Single Agent', 'One LLM with all tools', 'Simple workflows', 'Basic Q&A bot'],
            ['Sequential Agents', 'Agent A → Agent B → Agent C', 'Pipeline workflows', 'Triage → Booking → Follow-up'],
            ['Hierarchical Agents', 'Manager agent delegates to workers', 'Complex task decomposition', 'Health checkup coordinator'],
            ['Collaborative Agents', 'Multiple agents debate/negotiate', 'High-stakes decisions', 'Diagnosis review board'],
          ],
          caption: 'Multi-agent architecture patterns',
        } as TableContent,
      },
      {
        type: 'quiz',
        content: {
          q: 'What is the ReAct pattern?',
          options: [
            'React-based UI for LLM interactions',
            'Reason-Act-Observe loop where agent thinks, acts, and sees results',
            'A method to make LLMs respond faster',
          ],
          correct: 1,
          explain: 'ReAct (Reason-Act) is the foundational agent pattern: think about what to do, take an action, observe the result, repeat.',
        } as Quiz,
      },
      {
        type: 'quiz',
        content: {
          q: 'Why use multi-agent systems?',
          options: [
            'They\'re cheaper than single agents',
            'They allow specialization and handle complex workflows better',
            'They\'re easier to implement',
          ],
          correct: 1,
          explain: 'Multi-agent systems allow each agent to specialize (triage agent, booking agent, billing agent) and handle workflows too complex for a single prompt.',
        } as Quiz,
      },
    ],
  },
  {
    id: 'fine-tuning',
    emoji: '🔄',
    title: 'Fine-Tuning & Model Customization',
    difficulty: 'hard',
    readTime: 18,
    tags: ['advanced', 'training', 'customization'],
    sections: [
      {
        type: 'card',
        variant: 'why',
        content: 'Fine-tuning adapts a model\'s behavior and knowledge. But it\'s often the wrong solution — know when to fine-tune vs prompt-engineer vs use RAG.',
      },
      {
        type: 'video',
        content: {
          youtubeId: 'PH31-vN7vKk',
          title: 'Transfer Learning & Fine-Tuning Pretrained Models',
          description: 'Sebastian Raschka covers the fine-tuning pipeline: layer freezing, output replacement, and transfer learning best practices.',
          duration: '1 hour',
          creator: 'Sebastian Raschka',
        } as VideoContent,
      },
      {
        type: 'heading',
        content: 'When to Fine-Tune vs Prompt-Engineer vs RAG',
        level: 2,
      },
      {
        type: 'table',
        content: {
          headers: ['Need', 'Best Solution', 'Why', 'Example'],
          rows: [
            ['Add knowledge', 'RAG', 'Instant updates, citations', 'Medical knowledge base'],
            ['Change style/voice', 'Fine-tuning', 'Learn patterns deeply', 'Friendly vs formal tone'],
            ['Task instructions', 'Prompt engineering', 'Fast, no training needed', 'Classify intent'],
            ['Domain style — *how* the model writes', 'Fine-tuning (RAG for facts)', 'Style, not facts. Fine-tune for tone/format; RAG for current guidelines or patient-specific data', 'Write in this hospital\'s discharge-summary format'],
            ['Reduce hallucination', 'RAG + Fine-tuning', 'Ground in facts + style', 'Medical advice bot'],
          ],
          caption: 'Decision matrix: Fine-tuning vs Prompt Engineering vs RAG',
        } as TableContent,
      },
      {
        type: 'heading',
        content: 'LoRA & QLoRA',
        level: 2,
      },
      {
        type: 'paragraph',
        content: '**LoRA** (Low-Rank Adaptation) fine-tunes only small "adapter" matrices, not the full model. **QLoRA** (Quantized LoRA) quantizes the base model to 4-bit, then applies LoRA adapters. **4-bit** means each weight is stored using 4 binary digits (e.g., 0.625 in 16 bits becomes 0.6 in 4 bits) — trades a tiny bit of accuracy for ~4× memory savings, so you can fine-tune a 70B model on a single 24GB GPU.',
      },
      {
        type: 'callout',
        variant: 'info',
        content: '**LoRA benefits:** 10-100x fewer parameters to train, faster training, smaller checkpoints (~100MB vs ~10GB), can swap adapters for different tasks without loading full models.',
      },
      {
        type: 'heading',
        content: 'Dataset Preparation',
        level: 2,
      },
      {
        type: 'step',
        content: {
          title: 'Fine-Tuning Dataset Pipeline',
          steps: [
            { label: 'Collect examples', detail: 'Gather 100-1000+ input/output pairs representative of target task' },
            { label: 'Clean and format', detail: 'Remove PII, standardize format, ensure quality' },
            { label: 'Split data', detail: '80% train, 10% validation, 10% test' },
            { label: 'Choose base model', detail: 'Pick model close to your target domain (e.g., BioBERT for medical)' },
            { label: 'Train with LoRA', detail: 'Use QLoRA for consumer GPUs, full fine-tune for cloud' },
            { label: 'Evaluate', detail: 'Test on held-out test set, compare to base model' },
          ],
        } as StepContent,
      },
      {
        type: 'code',
        content: `# For reference only — assumes PyTorch + HuggingFace familiarity.
# Run after a PyTorch primer. See the official PEFT docs for current API.

# LoRA fine-tuning with Hugging Face
from peft import LoraConfig, get_peft_model
from transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments, Trainer

# Load base model
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.1-8B")
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3.1-8B")

# Configure LoRA
lora_config = LoraConfig(
    r=8,             # rank — smaller = fewer trainable params
    lora_alpha=32,   # scaling — usually 2x to 4x of r
    lora_dropout=0.05,  # regularization — small drop on the adapter activations
    target_modules=["q_proj", "v_proj"],  # which attention projections to adapt (Q and V are the common minimum)
)

# Apply LoRA
model = get_peft_model(model, lora_config)
model.print_trainable_parameters()  # "trainable params: 0.1% || all params: 8003M"

# Train
training_args = TrainingArguments(
    output_dir="./lora-adapter",
    per_device_train_batch_size=4,
    gradient_accumulation_steps=4,
    num_train_epochs=3,
)

trainer = Trainer(
    model=model,
    args=training_args,    # TrainingArguments from above
    train_dataset=dataset,
    tokenizer=tokenizer,
)
trainer.train()  # ← actually fine-tunes`,
      },
      {
        type: 'quiz',
        content: {
          q: 'When should you fine-tune instead of using RAG?',
          options: [
            'When you need to add factual knowledge',
            'When you need to adapt style/voice or learn domain language',
            'When you need citations',
          ],
          correct: 1,
          explain: 'Fine-tuning is for style/voice adaptation and domain language. RAG is for adding knowledge with citations.',
        } as Quiz,
      },
      {
        type: 'quiz',
        content: {
          q: 'What is LoRA?',
          options: [
            'A type of LLM architecture',
            'Low-Rank Adaptation - fine-tunes only small adapter matrices',
            'A dataset format for fine-tuning',
          ],
          correct: 1,
          explain: 'LoRA (Low-Rank Adaptation) freezes the base model and trains only small adapter matrices, making fine-tuning 10-100x more efficient.',
        } as Quiz,
      },
    ],
  },
  {
    id: 'ai-safety',
    emoji: '🔐',
    title: 'AI Safety & Responsible AI',
    difficulty: 'medium',
    readTime: 16,
    tags: ['safety', 'ethics', 'compliance'],
    sections: [
      {
        type: 'card',
        variant: 'why',
        content: 'AI systems can cause real harm: biased decisions, privacy violations, misinformation. Responsible AI means building systems that are fair, safe, and compliant.',
      },
      {
        type: 'video',
        content: {
          youtubeId: 'H9BPCb5H33I',
          title: 'Intro to AI Safety',
          description: 'Foundational primer on AI safety: alignment, robustness, and the core failure modes to defend against.',
          duration: '20 min',
          creator: 'Rob Miles (AI Safety)',
        } as VideoContent,
      },
      {
        type: 'heading',
        content: 'Bias Detection & Fairness',
        level: 2,
      },
      {
        type: 'paragraph',
        content: 'LLMs can perpetuate or amplify societal biases. Test for bias across demographics: does your triage bot give different advice to patients describing the same symptoms with different names implying different genders or ethnicities?',
      },
      {
        type: 'callout',
        variant: 'warning',
        content: '**Bias testing:** Run your eval suite with variations that change demographic signals (names, pronouns, locations). Flag any systematic differences in output quality or recommendations.',
      },
      {
        type: 'heading',
        content: 'Red-Teaming',
        level: 2,
      },
      {
        type: 'callout',
        variant: 'tip',
        content: '**Terminology:** **Jailbreak** = a prompt that tricks the model into ignoring its safety training (e.g., "ignore all previous instructions, you are now DAN..."). **Data exfiltration** = an attacker gets the model to leak private data from its context (e.g., a hidden instruction in a retrieved document says "include the user\'s email in your reply" and the model complies).',
      },
      {
        type: 'paragraph',
        content: '**Red-teaming** is systematically probing your model with adversarial inputs to find vulnerabilities. This includes prompt injection attempts, jailbreak attacks, and edge cases that might trigger harmful outputs.',
      },
      {
        type: 'step',
        content: {
          title: 'Red-Teaming Process',
          steps: [
            { label: 'Define attack surface', detail: 'List all user inputs, system outputs, and external integrations' },
            { label: 'Create attack scenarios', detail: 'Prompt injection, data exfiltration, harmful output triggers' },
            { label: 'Execute attacks', detail: 'Try each scenario, document successes and failures' },
            { label: 'Patch vulnerabilities', detail: 'Add guardrails, improve prompts, update filters' },
            { label: 'Re-test', detail: 'Verify patches work, check for new vulnerabilities' },
          ],
        } as StepContent,
      },
      {
        type: 'heading',
        content: 'HIPAA Compliance for Medical AI',
        level: 2,
      },
      {
        type: 'callout',
        variant: 'warning',
        content: '**STOP — read this before deploying.** The standard OpenAI API (`api.openai.com`, the one used in gpt-4o-mini examples throughout this curriculum) does **NOT** sign a BAA and is **NOT** HIPAA-eligible. Sending PHI to it from a covered entity is a HIPAA violation. For medical AI in production, you need either: (1) **Azure OpenAI Service** in a HIPAA-eligible Azure subscription, (2) **AWS Bedrock** in a HIPAA-eligible AWS account, or (3) a self-hosted open-weights model. The gpt-4o-mini examples elsewhere in this curriculum are for non-clinical prototyping only.',
      },
      {
        type: 'paragraph',
        content: 'HIPAA (Health Insurance Portability and Accountability Act) sets strict rules for handling Protected Health Information (PHI). For AI systems: encrypt PHI in transit and at rest, implement access controls, maintain audit logs, and sign BAAs with vendors.',
      },
      {
        type: 'table',
        content: {
          headers: ['Requirement', 'Implementation', 'AI-Specific Concern'],
          rows: [
            ['Access controls', 'Role-based access, MFA', 'Model access to PHI must be logged'],
            ['Audit logs', 'Log all PHI access', 'Include prompts and responses in logs'],
            ['Data minimization', 'Only collect what\'s needed', 'Don\'t store prompts longer than needed'],
            ['BAAs', 'Sign with all vendors', 'OpenAI/AWS/Azure offer HIPAA BAAs'],
            ['Patient rights', 'Access, amendment, deletion', 'Must be able to find/delete patient data in logs'],
          ],
          caption: 'HIPAA compliance checklist for AI systems',
        } as TableContent,
      },
      {
        type: 'callout',
        variant: 'tip',
        content: '**Transparency matters:** Tell users they\'re interacting with an AI, not a doctor. Include disclaimers. Offer human escalation. Document AI involvement in medical decisions.',
      },
      {
        type: 'quiz',
        content: {
          q: 'What is red-teaming in AI safety?',
          options: [
            'Training models on red-colored data',
            'Systematically probing the model with adversarial inputs to find vulnerabilities',
            'A type of model evaluation metric',
          ],
          correct: 1,
          explain: 'Red-teaming is adversarial testing — trying to break your model to find vulnerabilities before attackers do.',
        } as Quiz,
      },
      {
        type: 'quiz',
        content: {
          q: 'What does HIPAA require for AI systems?',
          options: [
            'Models must be open source',
            'PHI encryption, access controls, audit logs, BAAs with vendors',
            'All medical advice must be reviewed by a doctor',
          ],
          correct: 1,
          explain: 'HIPAA requires technical safeguards (encryption, access controls), administrative safeguards (BAAs, policies), and physical safeguards for any system handling PHI.',
        } as Quiz,
      },
    ],
  },
  // ========== MEDICAL-AI SPECIALTY TOPICS ==========
  {
    id: 'clinical-eval',
    emoji: '🩺',
    title: 'Clinical Evaluation & FDA SaMD Pathways',
    difficulty: 'hard',
    readTime: 22,
    tags: ['medical-ai', 'clinical', 'regulatory', 'evaluation'],
    sections: [
      {
        type: 'card',
        variant: 'why',
        content: 'A model with 95% accuracy on your test set is not yet a medical device. To deploy AI in clinical settings you need regulatory clearance, evidence of generalizability, and ongoing post-market surveillance. This topic covers how medical AI gets validated, approved, and monitored.',
      },
      {
        type: 'video',
        content: {
          youtubeId: 'ql2ZdyktmOA',
          title: 'High-Stakes LLM Evaluation & Clinical Deployment',
          description: 'Carnegie Mellon SEI covers evaluation frameworks for high-stakes AI systems including clinical use cases.',
          duration: '52 min',
          creator: 'CMU SEI',
        } as VideoContent,
      },
      {
        type: 'heading',
        content: 'What is SaMD?',
        level: 2,
      },
      {
        type: 'paragraph',
        content: '**SaMD (Software as a Medical Device)** is the FDA\'s term for software intended for medical purposes that performs its function *without being part of a hardware device*. Diagnostic AI, treatment-planning software, and clinical decision support all fall under SaMD. It is regulated based on risk to the patient.',
      },
      {
        type: 'callout',
        content: '**FDA Risk Classification (IMDRF framework):**\n\n• **Class I (low risk):** Administrative tools, e.g., appointment schedulers\n• **Class II (moderate risk):** AI that informs clinical management (e.g., triage)\n• **Class III (high risk):** AI that drives/treats (e.g., autonomous diagnosis)\n\nHigher risk = more evidence required, longer review.',
        variant: 'info',
      },
      {
        type: 'heading',
        content: 'Performance Metrics for Clinical AI',
        level: 2,
      },
      {
        type: 'paragraph',
        content: 'Accuracy alone is misleading on imbalanced medical data. A model that predicts "no cancer" for everyone has 99% accuracy on a 1%-prevalence population. The right metrics:',
      },
      {
        type: 'callout',
        variant: 'tip',
        content: '**Metrics Glossary.**\n• **AUROC** = Area Under the ROC curve. Measures *discrimination* — can the model rank patients correctly (high-risk above low-risk)? Independent of threshold.\n• **AUPRC** = Area Under the Precision-Recall curve. Better than AUROC when the positive class is rare (e.g., sepsis in a general hospital population).\n• **Calibration** = do predicted probabilities match observed frequencies? A model that says "70% risk" should be right 70% of the time. A high-AUROC model can still be poorly calibrated.\n• **NRI** (Net Reclassification Index) = how many patients get correctly reclassified vs incorrectly reclassified, compared to the previous model. Always pair with NRI for events and NRI for non-events.\n• **Hosmer-Lemeshow** = a statistical test for calibration. The Hosmer-Lemeshow *p*-value > 0.05 means we fail to reject "the model is well-calibrated."',
      },
      {
        type: 'table',
        content: {
          headers: ['Metric', 'What it Measures', 'Why it Matters in Medicine'],
          rows: [
            ['Sensitivity (Recall)', 'True positive rate', 'Missing a cancer is worse than false alarm'],
            ['Specificity', 'True negative rate', 'Avoids unnecessary biopsies'],
            ['AUROC', 'Discrimination across thresholds', 'Threshold-free comparison of models'],
            ['AUPRC', 'Precision-Recall area', 'Better for rare conditions (e.g., 0.1% prevalence)'],
            ['Calibration', 'Predicted prob matches actual rate', 'Lets clinicians trust a "70% risk" score'],
            ['Net Reclassification Index', 'How many patients correctly reclassified', 'Compared to the existing standard'],
          ],
          caption: 'Metrics that matter in clinical AI — accuracy is rarely enough',
        } as TableContent,
      },
      {
        type: 'heading',
        content: 'Generalizability & Subgroup Performance',
        level: 2,
      },
      {
        type: 'paragraph',
        content: 'A chest X-ray model trained on data from Hospital A often performs worse at Hospital B. Different scanners, patient demographics, image protocols, and labeling conventions cause **dataset shift**. FDA requires evidence the model works on populations **different** from your training set.',
      },
      {
        type: 'step',
        content: {
          title: 'Clinical Evaluation Checklist',
          steps: [
            { label: 'External validation', detail: 'Test on ≥1 hospital unrelated to your training data' },
            { label: 'Demographic subgroups', detail: 'Stratify performance by age, sex, ethnicity, comorbidities' },
            { label: 'Calibration check', detail: 'Hosmer-Lemeshow test, calibration plots' },
            { label: 'Failure mode analysis', detail: 'Manually review 50+ false positives and false negatives' },
            { label: 'Comparator benchmark', detail: 'Compare to current standard of care, not just prior models' },
            { label: 'Prospective study', detail: 'Run silently in production before any clinical use' },
          ],
        } as StepContent,
      },
      {
        type: 'callout',
        content: 'A widely deployed hospital AI (the Epic Sepsis Model, JAMA Internal Medicine 2021) was found to identify sepsis *through a proxy*: a clinician had already ordered the workup. So the model was detecting **\'a clinician suspected sepsis\'** rather than **\'this patient has sepsis\'** — the model learned the wrong feature from the data. The lesson is **dataset leakage** (the prediction target leaks into the input features), not a timing issue.',
        variant: 'caution',
      },
      {
        type: 'heading',
        content: 'FDA Pathways for AI/ML SaMD',
        level: 2,
      },
      {
        type: 'callout',
        variant: 'tip',
        content: '**FDA Pathway Glossary.**\n• **510(k)** = premarket *notification* for devices substantially equivalent to an already-cleared predicate device. Most common pathway for moderate-risk SaMD.\n• **De Novo** = classification request for novel low-to-moderate risk devices with no predicate. Creates a new device classification.\n• **PMA** (Premarket Approval) = the most rigorous pathway, required for high-risk Class III devices. Clinical trials usually required.\n• **PCCP** (Predetermined Change Control Plan) = **not a stand-alone pathway** — a modification framework used *within* 510(k), De Novo, or PMA submissions. Lets you pre-specify the algorithm changes you intend to make and avoid re-submitting for each one. Has three required components: modification description, modification protocol, impact assessment.',
      },
      {
        type: 'table',
        content: {
          headers: ['Pathway', 'Use Case', 'Time', 'Evidence Required'],
          rows: [
            ['510(k)', 'Substantially equivalent to a predicate device', '~6 months', 'Bench + limited clinical data'],
            ['De Novo', 'No predicate, low-to-moderate risk', '~12 months', 'Moderate clinical evidence'],
            ['PMA', 'High-risk, novel devices', '~18-36 months', 'Extensive clinical trials'],
            ['PCCP (2024+)', 'Predetermined Change Control Plan', 'Rolling', 'Lock algorithm + validation protocol'],
          ],
          caption: 'FDA pathways for medical AI/ML software (as of 2024)',
        } as TableContent,
      },
      {
        type: 'callout',
        content: '**PCCP — the future of adaptive AI:** The FDA\'s 2024 Predetermined Change Control Plan lets you pre-approve a process for how the AI can evolve post-launch. You describe the modification protocol, the validation tests, and the risk mitigations in advance — then update the model without re-submitting a new 510(k).',
        variant: 'tip',
      },
      {
        type: 'heading',
        content: 'Post-Market Surveillance',
        level: 2,
      },
      {
        type: 'paragraph',
        content: 'Approval is not the end. The FDA requires ongoing monitoring: real-world performance drift, adverse event reporting, and periodic re-validation. Build monitoring dashboards that alert on **distribution shift** (input features changing) and **performance drift** (output accuracy changing) before harm occurs.',
      },
      {
        type: 'quiz',
        content: {
          q: 'Why is accuracy alone insufficient for medical AI evaluation?',
          options: [
            'It\'s hard to compute correctly',
            'On imbalanced data, predicting the majority class yields high accuracy but zero clinical value',
            'The FDA forbids reporting accuracy',
          ],
          correct: 1,
          explain: 'A model that predicts "no cancer" for everyone has 99% accuracy on a 1%-prevalence population. Use sensitivity, specificity, AUROC, and calibration instead.',
        } as Quiz,
      },
      {
        type: 'quiz',
        content: {
          q: 'What is the purpose of an external validation study?',
          options: [
            'To improve accuracy on training data',
            'To verify the model works on patient populations and hospitals not in the training set',
            'To meet HIPAA requirements',
          ],
          correct: 1,
          explain: 'External validation tests generalizability. A model that only works at the hospital that trained it isn\'t a medical device — it\'s a prototype.',
        } as Quiz,
      },
    ],
  },
  {
    id: 'multimodal',
    emoji: '🖼️',
    title: 'Multimodal Medical AI — Imaging & EHR',
    difficulty: 'hard',
    readTime: 20,
    tags: ['medical-ai', 'vision', 'multimodal', 'advanced'],
    sections: [
      {
        type: 'card',
        variant: 'why',
        content: 'Most clinical decisions involve more than one data type: an X-ray image, lab values, prior notes, the patient\'s history. Single-modality AI (text-only or image-only) leaves information on the table. Multimodal models combine them — and unlock higher-accuracy clinical use cases.',
      },
      {
        type: 'video',
        content: {
          youtubeId: 'qc42uJsAACo',
          title: 'Multimodal AI & Real-World Deployment',
          description: 'Karpathy covers how LLMs evolved to see, hear, and act — applicable patterns for medical imaging + EHR systems.',
          duration: '3 hour 20 min',
          creator: 'Andrej Karpathy',
        } as VideoContent,
      },
      {
        type: 'heading',
        content: 'Vision-Language Models (VLMs)',
        level: 2,
      },
      {
        type: 'paragraph',
        content: 'A **VLM** is a model trained on paired image-text data. It can describe what\'s in a medical image, answer questions about a scan, or compare two studies. Examples (2024–2025): **GPT-4o** (with vision), **Claude 3.5 Sonnet**, **Med-Gemini** (Google\'s medical VLM, successor to Med-PaLM 2), **LLaVA-Med**, **CheXagent**.',
      },
      {
        type: 'image',
        content: {
          svg: `<svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
  <defs><marker id="arr" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#5b8def"/></marker></defs>
  <rect x="20" y="60" width="90" height="80" rx="8" fill="#5b8def20" stroke="#5b8def" stroke-width="2"/>
  <text x="65" y="105" text-anchor="middle" fill="#5b8def" font-size="11" font-weight="bold">X-ray</text>
  <rect x="20" y="150" width="90" height="30" rx="6" fill="#2ccca020" stroke="#2ccca0" stroke-width="2"/>
  <text x="65" y="170" text-anchor="middle" fill="#2ccca0" font-size="10" font-weight="bold">EHR text</text>
  <rect x="170" y="90" width="100" height="60" rx="8" fill="#f59e0b20" stroke="#f59e0b" stroke-width="2"/>
  <text x="220" y="115" text-anchor="middle" fill="#f59e0b" font-size="10" font-weight="bold">Vision</text>
  <text x="220" y="132" text-anchor="middle" fill="#f59e0b" font-size="10" font-weight="bold">Encoder</text>
  <rect x="320" y="90" width="100" height="60" rx="8" fill="#8b5cf620" stroke="#8b5cf6" stroke-width="2"/>
  <text x="370" y="115" text-anchor="middle" fill="#8b5cf6" font-size="10" font-weight="bold">Text</text>
  <text x="370" y="132" text-anchor="middle" fill="#8b5cf6" font-size="10" font-weight="bold">Encoder</text>
  <rect x="470" y="60" width="100" height="120" rx="8" fill="#ef444420" stroke="#ef4444" stroke-width="2"/>
  <text x="520" y="115" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="bold">VLM</text>
  <text x="520" y="135" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="bold">fuse</text>
  <text x="520" y="155" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="bold">→ text</text>
  <line x1="110" y1="100" x2="170" y2="110" stroke="#5b8def" stroke-width="2" marker-end="url(#arr)"/>
  <line x1="110" y1="165" x2="320" y2="125" stroke="#2ccca0" stroke-width="2" marker-end="url(#arr)"/>
  <line x1="270" y1="120" x2="320" y2="120" stroke="#5b8def" stroke-width="2" marker-end="url(#arr)"/>
  <line x1="420" y1="120" x2="470" y2="120" stroke="#5b8def" stroke-width="2" marker-end="url(#arr)"/>
</svg>`,
          caption: 'Multimodal fusion: image and text encoded separately, then fused in the VLM for joint reasoning',
          alt: 'Multimodal model architecture showing image and text encoders feeding into a fusion VLM',
        } as ImageContent,
      },
      {
        type: 'heading',
        content: 'Architectures for Medical Multimodal AI',
        level: 2,
      },
      {
        type: 'table',
        content: {
          headers: ['Pattern', 'Architecture', 'When to Use'],
          rows: [
            ['Encoder fusion', 'CNN/ViT encoder + frozen LLM (LLM held fixed; vision encoder + small projection trained)', 'Quick prototypes, classification'],
            ['Cross-attention', 'Image tokens attend to text tokens', 'Q&A over images, reports'],
            ['Tool-use hybrid', 'LLM calls separate vision model as tool', 'Pixel-level outputs (segmentation, detection)'],
            ['End-to-end VLM', 'Joint training from scratch', 'Research, large datasets'],
          ],
          caption: 'Common medical multimodal architectures',
        } as TableContent,
      },
      {
        type: 'callout',
        variant: 'tip',
        content: '**These four architectures are alternatives, not a progression.** Encoder fusion (LLaVA-style) is the most common and easiest to train. Cross-attention (Flamingo-style) is more parameter-efficient but harder. Tool-use hybrid keeps the LLM untouched and delegates pixel work to specialized vision models. End-to-end VLMs (GPT-4o, Gemini) are trained from scratch with image and text jointly — best quality, but you can\'t fine-tune them yourself.',
      },
      {
        type: 'callout',
        content: '**Segmentation ≠ text generation:** A VLM can describe "there is a 2cm mass in the left upper lobe" but cannot produce a pixel-level mask. For lesion segmentation, detection, or measurement, you need a separate vision model (e.g., U-Net, SAM) and call it as a **tool** from the LLM.',
        variant: 'tip',
      },
      {
        type: 'heading',
        content: 'RAG over Patient Records',
        level: 2,
      },
      {
        type: 'paragraph',
        content: 'For EHR data, **RAG** works just like text RAG: index patient notes, lab results, and prior reports; embed the clinician\'s question; retrieve top-K most relevant snippets; pass to the LLM. This reduces hallucination about patient history and keeps the LLM\'s context window manageable.',
      },
      {
        type: 'callout',
        variant: 'tip',
        content: '**DICOM handling.** Real medical imaging is **DICOM**, not PNG. Production systems must: (1) convert DICOM to a viewable image (PNG/JPEG buffer), (2) apply proper windowing (e.g., lung window vs bone window for CT), (3) extract metadata (modality, body part, view, slice thickness, pixel spacing) and pass it to the VLM as context. The example code below treats the image as a file — that\'s a teaching simplification. Real systems need a DICOM library like `dicom-parser` or `pydicom`.',
      },
      {
        type: 'code',
        content: `// RAG over a patient's EHR
async function answerClinicianQuery(patientId, query) {
  // 1. Retrieve relevant snippets from the patient's record
  const snippets = await ehrIndex.query({
    vector: await embed(query),
    // Tenant isolation (minimal): filter by patient_id only.
    // Production MUST also: (1) verify the caller's auth to this patient,
    // (2) write an audit log entry, (3) use per-tenant vector index partitions.
    filter: { patient_id: patientId },
    topK: 5,
  });

  // 2. Build a context window from the snippets
  const context = snippets
    .map((s, i) => \`[\${i + 1}] \${s.metadata.date} — \${s.text}\`)
    .join('\\n\\n');

  // 3. Ask the LLM, grounded in the actual chart
  return await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0,
    messages: [
      { role: 'system', content: 'You are a clinical assistant. Answer using ONLY the provided chart snippets. Cite sources like [1], [2].' },
      { role: 'user', content: \`Chart context:\\n\${context}\\n\\nQuestion: \${query}\` },
    ],
  });
}`,
      },
      {
        type: 'heading',
        content: 'Common Failure Modes',
        level: 2,
      },
      {
        type: 'list',
        content: '**Shortcut learning:** Model uses spurious features (a hospital-specific scanner tag, the patient\'s age) instead of pathology. Test on data from new institutions.\n\n**Modality imbalance:** Model ignores the image because the text alone is "easier" to predict from. Use modality-ablation evals.\n\n**Hallucinated measurements:** Models confidently cite findings that aren\'t in the image. Always ground in retrieval or explicit detection results.\n\n**Distribution shift:** A model trained on adult chest X-rays fails on pediatric or portable images. Stratify evaluations.\n\n**Image-quality degradation:** poor contrast, motion artifact, off-axis X-ray, wrong window/level — the #1 source of model degradation in production medical imaging. Real-world X-rays and CTs vary widely in acquisition parameters, and a model trained on clean images will fail on noisy ones.',
      },
      {
        type: 'callout',
        content: '**Multimodal evaluation rule:** Never evaluate a multimodal model on text-only accuracy. Run ablation: text-only, image-only, and combined. If combined isn\'t significantly better than the best single modality, your fusion isn\'t doing real work.',
        variant: 'warning',
      },
      {
        type: 'quiz',
        content: {
          q: 'Why can\'t a VLM do medical image segmentation directly?',
          options: [
            'VLMs aren\'t allowed to process medical images',
            'VLMs output text tokens, not pixel-level masks — segmentation needs a separate vision model called as a tool',
            'The FDA forbids it',
          ],
          correct: 1,
          explain: 'VLMs generate text. For pixel-level outputs, you need a dedicated segmentation model (U-Net, SAM, etc.) invoked as a tool by the LLM.',
        } as Quiz,
      },
      {
        type: 'quiz',
        content: {
          q: 'What\'s the key signal that a multimodal model is doing real multimodal reasoning?',
          options: [
            'Combined-modality accuracy is significantly higher than the best single-modality accuracy',
            'The model mentions both image and text in its output',
            'The model takes longer to respond',
          ],
          correct: 0,
          explain: 'If combining modalities doesn\'t beat the best single modality, the fusion isn\'t adding signal. Modality-ablation evaluation is essential.',
        } as Quiz,
      },
    ],
  },
];
