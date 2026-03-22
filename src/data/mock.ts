export interface Model {
  id: string;
  name: string;
  author: string;
  description: string;
  tags: string[];
  downloads: number;
  likes: number;
  task: string;
  updatedAt: string;
}

export interface Dataset {
  id: string;
  name: string;
  author: string;
  description: string;
  tags: string[];
  downloads: number;
  size: string;
  updatedAt: string;
}

export interface Space {
  id: string;
  name: string;
  author: string;
  description: string;
  emoji: string;
  likes: number;
  runtime: string;
}

export const models: Model[] = [
  { id: "meta-llama-3.1-70b", name: "Llama 3.1 70B", author: "Meta", description: "Large language model optimized for instruction following, reasoning, and code generation.", tags: ["text-generation", "llm", "70b"], downloads: 2_847_320, likes: 12_430, task: "Text Generation", updatedAt: "3 days ago" },
  { id: "stable-diffusion-xl", name: "Stable Diffusion XL", author: "Stability AI", description: "High-resolution image generation with enhanced composition and face generation.", tags: ["image-generation", "diffusion", "1024px"], downloads: 5_134_000, likes: 18_920, task: "Image Generation", updatedAt: "1 week ago" },
  { id: "whisper-large-v3", name: "Whisper Large V3", author: "OpenAI", description: "Robust speech recognition and translation model supporting 99 languages.", tags: ["speech-recognition", "multilingual", "transcription"], downloads: 1_293_000, likes: 7_820, task: "Speech Recognition", updatedAt: "2 weeks ago" },
  { id: "codellama-34b", name: "CodeLlama 34B", author: "Meta", description: "Code-specialized LLM for code completion, generation, and understanding.", tags: ["code-generation", "llm", "34b"], downloads: 892_000, likes: 5_640, task: "Code Generation", updatedAt: "5 days ago" },
  { id: "mixtral-8x7b", name: "Mixtral 8x7B", author: "Mistral AI", description: "Sparse mixture-of-experts model with strong multilingual capabilities.", tags: ["text-generation", "moe", "multilingual"], downloads: 1_567_000, likes: 9_340, task: "Text Generation", updatedAt: "4 days ago" },
  { id: "gemma-2-9b", name: "Gemma 2 9B", author: "Google", description: "Lightweight and efficient model for text generation and reasoning tasks.", tags: ["text-generation", "efficient", "9b"], downloads: 734_000, likes: 4_210, task: "Text Generation", updatedAt: "1 day ago" },
  { id: "flux-1-schnell", name: "FLUX.1 Schnell", author: "Black Forest Labs", description: "Ultra-fast image generation model delivering quality results in fewer steps.", tags: ["image-generation", "fast", "flux"], downloads: 2_100_000, likes: 11_200, task: "Image Generation", updatedAt: "6 days ago" },
  { id: "phi-3-medium", name: "Phi-3 Medium", author: "Microsoft", description: "Compact yet powerful model excelling in reasoning benchmarks.", tags: ["text-generation", "compact", "14b"], downloads: 456_000, likes: 3_100, task: "Text Generation", updatedAt: "2 days ago" },
];

export const datasets: Dataset[] = [
  { id: "common-voice", name: "Common Voice 17.0", author: "Mozilla", description: "Multi-language speech dataset with 19,000+ hours of validated voice data.", tags: ["speech", "multilingual", "crowdsourced"], downloads: 342_000, size: "78 GB", updatedAt: "1 week ago" },
  { id: "imagenet-1k", name: "ImageNet-1K", author: "Stanford", description: "Benchmark dataset containing 1.2M training images across 1,000 categories.", tags: ["image-classification", "benchmark", "1000-classes"], downloads: 1_230_000, size: "138 GB", updatedAt: "3 months ago" },
  { id: "openwebtext2", name: "OpenWebText2", author: "EleutherAI", description: "Large-scale web text corpus for language model pre-training.", tags: ["text", "web-crawl", "pre-training"], downloads: 567_000, size: "65 GB", updatedAt: "6 months ago" },
  { id: "squad-v2", name: "SQuAD v2.0", author: "Stanford", description: "Reading comprehension dataset with 150K+ question-answer pairs.", tags: ["qa", "reading-comprehension", "benchmark"], downloads: 890_000, size: "42 MB", updatedAt: "1 year ago" },
  { id: "coco-2017", name: "COCO 2017", author: "Microsoft", description: "Object detection and segmentation with 330K images and 80 categories.", tags: ["object-detection", "segmentation", "captions"], downloads: 780_000, size: "25 GB", updatedAt: "2 months ago" },
  { id: "fineweb", name: "FineWeb", author: "HuggingFace", description: "15T tokens of high-quality web data for LLM pre-training.", tags: ["text", "pre-training", "curated"], downloads: 234_000, size: "44 TB", updatedAt: "2 weeks ago" },
];

export const spaces: Space[] = [
  { id: "chatbot-arena", name: "Chatbot Arena", author: "lmsys", description: "Compare responses from leading LLMs side by side.", emoji: "⚔️", likes: 23_400, runtime: "Gradio" },
  { id: "stable-diffusion-playground", name: "SD Playground", author: "stability-ai", description: "Generate images with Stable Diffusion XL in real time.", emoji: "🎨", likes: 18_700, runtime: "Gradio" },
  { id: "whisper-transcribe", name: "Whisper Transcribe", author: "openai", description: "Upload audio and get instant transcription in 99 languages.", emoji: "🎙️", likes: 12_300, runtime: "Streamlit" },
  { id: "code-llama-playground", name: "Code Assistant", author: "meta-llama", description: "AI-powered code generation and debugging assistant.", emoji: "💻", likes: 9_800, runtime: "Gradio" },
  { id: "image-to-text", name: "Image Captioner", author: "salesforce", description: "Generate captions and descriptions for any image.", emoji: "🖼️", likes: 7_600, runtime: "Streamlit" },
  { id: "music-gen", name: "MusicGen", author: "facebook", description: "Generate music from text descriptions using AI.", emoji: "🎵", likes: 14_200, runtime: "Gradio" },
];

export const taskFilters = [
  "All", "Text Generation", "Image Generation", "Speech Recognition",
  "Code Generation", "Translation", "Question Answering", "Summarization",
];

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}
