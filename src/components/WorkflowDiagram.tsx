import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface WorkflowNode {
  name: string;
  type: string;
}

interface WorkflowDiagramProps {
  nodes: WorkflowNode[];
}

const getNodeColor = (type: string): string => {
  if (type.includes('trigger') || type.includes('Trigger')) return 'bg-green-500/20 border-green-500/50 text-green-700 dark:text-green-400';
  if (type.includes('google') || type.includes('Google')) return 'bg-blue-500/20 border-blue-500/50 text-blue-700 dark:text-blue-400';
  if (type.includes('apify') || type.includes('Apify')) return 'bg-cyan-500/20 border-cyan-500/50 text-cyan-700 dark:text-cyan-400';
  if (type.includes('openAi') || type.includes('langchain') || type.includes('llm')) return 'bg-emerald-500/20 border-emerald-500/50 text-emerald-700 dark:text-emerald-400';
  if (type.includes('email') || type.includes('Email') || type.includes('gmail')) return 'bg-red-500/20 border-red-500/50 text-red-700 dark:text-red-400';
  if (type.includes('extract') || type.includes('pdf')) return 'bg-orange-500/20 border-orange-500/50 text-orange-700 dark:text-orange-400';
  if (type.includes('if') || type.includes('switch') || type.includes('filter')) return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-700 dark:text-yellow-400';
  if (type.includes('set') || type.includes('code')) return 'bg-slate-500/20 border-slate-500/50 text-slate-700 dark:text-slate-400';
  return 'bg-primary/20 border-primary/50 text-primary';
};

const getNodeIcon = (type: string): string => {
  if (type.includes('trigger') || type.includes('Trigger')) return '▶';
  if (type.includes('google') || type.includes('Google')) return '📊';
  if (type.includes('apify') || type.includes('Apify')) return '🕷️';
  if (type.includes('openAi') || type.includes('langchain') || type.includes('llm')) return '🤖';
  if (type.includes('email') || type.includes('Email') || type.includes('gmail')) return '📧';
  if (type.includes('extract') || type.includes('pdf')) return '📄';
  if (type.includes('if') || type.includes('switch') || type.includes('filter')) return '🔀';
  if (type.includes('set') || type.includes('code')) return '⚙️';
  return '📦';
};

export const WorkflowDiagram = ({ nodes }: WorkflowDiagramProps) => {
  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex items-center gap-2 min-w-max px-4">
        {nodes.map((node, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="flex items-center"
          >
            <div
              className={`relative p-4 rounded-xl border-2 min-w-[140px] max-w-[180px] ${getNodeColor(node.type)}`}
            >
              <div className="absolute -top-3 left-3 text-lg">
                {getNodeIcon(node.type)}
              </div>
              <p className="font-semibold text-sm mt-1 line-clamp-2">{node.name}</p>
              <p className="text-xs opacity-70 mt-1 truncate">
                {node.type.replace('n8n-nodes-base.', '').replace('@n8n/n8n-nodes-langchain.', '').replace('@apify/n8n-nodes-apify.', '')}
              </p>
            </div>
            {index < nodes.length - 1 && (
              <ArrowRight className="w-6 h-6 mx-2 text-muted-foreground flex-shrink-0" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
