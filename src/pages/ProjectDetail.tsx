import { motion } from "framer-motion";
import { ArrowLeft, Workflow, FileJson, CheckCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { WorkflowDiagram } from "@/components/WorkflowDiagram";

interface WorkflowNode {
  parameters: Record<string, unknown>;
  type: string;
  name: string;
}

interface WorkflowData {
  name: string;
  nodes: WorkflowNode[];
}

const projectsData: Record<string, {
  title: string;
  description: string;
  features: string[];
  techUsed: string[];
  workflowFile?: string;
}> = {
  "invoice-automation": {
    title: "Invoice Automation - AI Document Processing",
    description: "An intelligent invoice processing system that monitors Google Drive for new PDF invoices, extracts structured data using AI, stores it in Google Sheets, and sends automated email confirmations.",
    features: [
      "Google Drive folder monitoring for new invoices",
      "PDF extraction and text parsing",
      "AI-powered data extraction (Customer, Company, Email, Address, Amount, etc.)",
      "Structured output using LLM Chain",
      "Automatic Google Sheets data population",
      "Email confirmation to customers"
    ],
    techUsed: ["n8n", "Google Drive", "PDF Processing", "OpenAI GPT", "LangChain", "Google Sheets", "Email Automation"],
    workflowFile: "/workflows/invoice-automation.json"
  },
  "sales-req-agent": {
    title: "Sales Requirement Agent - AI Lead Qualification",
    description: "A comprehensive sales lead qualification system that captures leads via forms, scores them using AI, integrates with Gmail and Google Sheets, and automates follow-up communications.",
    features: [
      "Lead submission form with budget, timeline, and project details",
      "AI-powered lead scoring and qualification",
      "Conditional routing based on lead quality",
      "Gmail integration for automated responses",
      "Google Sheets CRM integration",
      "Intent classification (Lead Gen, Content, Onboarding, General)"
    ],
    techUsed: ["n8n", "Form Handling", "OpenAI GPT", "Gmail API", "Google Sheets", "AI Classification", "Webhooks"],
    workflowFile: "/workflows/sales-req-agent.json"
  },
  "full-recruitment": {
    title: "Full Recruitment Automation Workflow",
    description: "An end-to-end recruitment automation system built with n8n that handles job applications, candidate screening, and automated communications.",
    features: [
      "Job Application Form with detailed job description",
      "Automated candidate data collection",
      "Email notifications to applicants",
      "Google Sheets integration for data storage",
      "Conditional workflow routing based on responses"
    ],
    techUsed: ["n8n", "Google Sheets", "Email Integration", "Webhooks", "Form Handling"],
    workflowFile: "/workflows/full-recruitment.json"
  },
  "job-automation": {
    title: "Job Automation Workflow",
    description: "A scheduled job automation system that downloads resumes from Google Drive, extracts PDF content, filters candidates based on criteria from Google Sheets, and sends automated email notifications.",
    features: [
      "Scheduled trigger runs daily at 5 PM",
      "Google Drive integration for resume downloads",
      "PDF text extraction for resume parsing",
      "Google Sheets integration for filter criteria",
      "Automated email notifications to candidates"
    ],
    techUsed: ["n8n", "Google Drive", "Google Sheets", "PDF Processing", "Email Automation", "Schedule Triggers"],
    workflowFile: "/workflows/job-automation.json"
  },
  "ats": {
    title: "ATS - Applicant Tracking System",
    description: "An AI-powered Applicant Tracking System that collects job applications via forms, extracts resume data using AI (GPT-4), and automatically organizes candidate information in Google Sheets.",
    features: [
      "Job application form with file upload",
      "Resume PDF extraction and parsing",
      "AI-powered resume analysis using GPT-4",
      "Structured data output with LLM chain",
      "Automatic Google Sheets data storage"
    ],
    techUsed: ["n8n", "OpenAI GPT-4", "LangChain", "Google Sheets", "PDF Processing", "Form Handling"],
    workflowFile: "/workflows/ats.json"
  },
  "apify-google-maps": {
    title: "Apify Google Maps Scraper Pipeline",
    description: "A powerful web scraping automation that uses Apify's Google Maps Scraper to extract business data, processes results through n8n, and automatically populates Google Sheets with structured location data.",
    features: [
      "Google Maps Scraper with Apify integration",
      "Dynamic search parameters from Google Sheets",
      "Automated dataset retrieval and processing",
      "Data transformation and cleanup",
      "Auto-append results to Google Sheets"
    ],
    techUsed: ["n8n", "Apify", "Google Maps Scraper", "Google Sheets", "Data Processing"],
    workflowFile: "/workflows/apify.json"
  },
  "linkedin-content": {
    title: "LinkedIn Content Parasystem",
    description: "An AI-powered content generation workflow that scrapes LinkedIn posts from your favorite creators using Apify, analyzes them with the latest AI models, and generates engaging content ideas tailored to your style.",
    features: [
      "LinkedIn profile URL input via form",
      "Apify LinkedIn Post Scraper integration",
      "Batch processing of scraped posts",
      "Latest-model AI analysis and content generation",
      "Structured output with content recommendations"
    ],
    techUsed: ["n8n", "Apify", "LinkedIn Scraper", "Latest AI Models", "AI Content Generation", "Form Handling"],
    workflowFile: "/workflows/linkedin-content.json"
  },
  "gmail-agent": {
    title: "Gmail Agent - AI Email Automation",
    description: "An intelligent email automation system that monitors your Gmail inbox, classifies incoming emails by category (Customer Support, Finance/Billing, High Priority, Promotions), and automatically drafts contextual responses using AI.",
    features: [
      "Real-time Gmail inbox monitoring (every minute)",
      "AI-powered email classification into 4 categories",
      "Conditional routing based on email type",
      "GPT-powered intelligent response generation",
      "Separate handling for support, billing, urgent, and promo emails"
    ],
    techUsed: ["n8n", "Gmail API", "OpenRouter LLM", "AI Text Classifier", "LangChain", "Conditional Routing"],
    workflowFile: "/workflows/gmail-agent.json"
  },
  "srp-rag-chatbot": {
    title: "SRP RAG Chatbot - AI Telegram Assistant",
    description: "An AI-powered Telegram chatbot with RAG (Retrieval-Augmented Generation) capabilities that provides intelligent customer support responses using the latest AI models and Supabase Vector Store.",
    features: [
      "Telegram trigger for incoming messages",
      "Google Drive RAG integration for knowledge base",
      "Supabase Vector Store for document retrieval",
      "Latest AI models for intelligent responses",
      "Message formatting for Telegram-friendly output",
      "Window Buffer Memory for conversation context"
    ],
    techUsed: ["n8n", "Telegram API", "Latest AI Models", "Supabase Vector Store", "RAG Pipeline", "LangChain"],
    workflowFile: "/workflows/srp-rag-chatbot.json"
  },
  "self-learning-agent": {
    title: "Self Learning Agent - AI Telegram Assistant",
    description: "An intelligent Telegram agent that processes both voice and text messages, uses Pinecone vector store for RAG-based knowledge retrieval, and continuously learns from user interactions.",
    features: [
      "Telegram trigger for voice and text messages",
      "Audio transcription using OpenAI Whisper",
      "Pinecone Vector Store for knowledge retrieval",
      "Latest AI models for intelligent responses",
      "Switch routing for audio vs text input",
      "Recursive character text splitting for documents",
      "Window Buffer Memory for conversation context"
    ],
    techUsed: ["n8n", "Telegram API", "OpenAI Whisper", "Pinecone", "Latest AI Models", "RAG Pipeline", "LangChain"],
    workflowFile: "/workflows/self-learning-agent.json"
  },
  "twitter-parasyte-system": {
    title: "Twitter Parasyte System - Content Automation",
    description: "An automated Twitter/X content system that scrapes tweets using Apify, analyzes content with AI, generates engaging responses, and helps grow your social media presence.",
    features: [
      "Form trigger for keyword-based searches",
      "Apify Tweet Scraper integration",
      "AI-powered tweet analysis and classification",
      "Latest AI models for response generation",
      "Batch processing of scraped tweets",
      "Content relevance scoring"
    ],
    techUsed: ["n8n", "Apify", "Twitter/X Scraper", "Latest AI Models", "AI Classification", "Form Handling"],
    workflowFile: "/workflows/twitter-parasyte-system.json"
  },
  "ig-scraping-posts": {
    title: "Instagram Scraping Posts - Content Curation",
    description: "An AI-powered Instagram content scraper that extracts posts from profiles, classifies content relevance using the latest AI models, and automates content curation workflows for AI-focused audiences.",
    features: [
      "Apify Instagram Post Scraper integration",
      "AI-powered content classification",
      "Relevance scoring for AI-related content",
      "Conditional routing based on classification",
      "Batch processing of scraped posts",
      "Structured JSON output"
    ],
    techUsed: ["n8n", "Apify", "Instagram Scraper", "Latest AI Models", "AI Classification", "Data Processing"],
    workflowFile: "/workflows/ig-scraping-posts.json"
  },
  "email-classifier-agent": {
    title: "Email Classifier AI Agent - Smart Email Routing",
    description: "An intelligent email classification system that categorizes incoming emails into Priority, Finance, Banking, Promotions, Personal, and Support categories, then routes them to appropriate workflows.",
    features: [
      "Gmail trigger with real-time monitoring",
      "Multi-category email classification",
      "AI-powered intent detection",
      "Conditional routing based on category",
      "Priority handling for urgent emails",
      "Automated response drafting",
      "Support ticket integration"
    ],
    techUsed: ["n8n", "Gmail API", "OpenAI GPT", "AI Text Classifier", "Conditional Routing", "Email Automation"],
    workflowFile: "/workflows/email-classifier-agent.json"
  }
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [workflow, setWorkflow] = useState<WorkflowData | null>(null);
  const project = slug ? projectsData[slug] : null;

  useEffect(() => {
    if (project?.workflowFile) {
      fetch(project.workflowFile)
        .then(res => res.json())
        .then(data => setWorkflow(data))
        .catch(console.error);
    }
  }, [project?.workflowFile]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Button asChild>
            <Link to="/#projects">Back to Projects</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              SRP Automation Labs
            </Link>
            <Button variant="ghost" asChild>
              <Link to="/#projects" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Project Content */}
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
            {project.description}
          </p>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Features Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Key Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Tech Stack Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Workflow className="w-5 h-5 text-primary" />
                  Technologies Used
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.techUsed.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Visual Workflow Diagram */}
          {workflow && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Workflow className="w-5 h-5 text-primary" />
                  Visual Workflow Flow
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  This workflow contains <span className="font-semibold text-foreground">{workflow.nodes.length} nodes</span> connected in sequence:
                </p>
                <WorkflowDiagram nodes={workflow.nodes} />
              </CardContent>
            </Card>
          )}

          {/* Workflow Nodes Grid */}
          {workflow && (
            <Card className="mb-8">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileJson className="w-5 h-5 text-primary" />
                  Workflow Nodes
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (project?.workflowFile) {
                      const link = document.createElement('a');
                      link.href = project.workflowFile;
                      link.download = `${slug}.json`;
                      link.click();
                    }
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download JSON
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {workflow.nodes.map((node, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-3 bg-muted/50 rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
                    >
                      <p className="font-medium text-sm truncate">{node.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {node.type.replace('n8n-nodes-base.', '').replace('@n8n/n8n-nodes-langchain.', '').replace('@apify/n8n-nodes-apify.', '')}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Raw JSON (collapsed by default) */}
          {workflow && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Raw JSON Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 rounded-lg p-4 overflow-auto max-h-64">
                  <pre className="text-xs text-muted-foreground">
                    {JSON.stringify(workflow, null, 2)}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 SRP Automation Labs — Workflow Automation & AI Solutions</p>
        </div>
      </footer>
    </div>
  );
};

export default ProjectDetail;
