import { useState, KeyboardEvent } from 'react';
import { Send, PlusCircle, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MessageInputProps {
  onSend: (message: string) => void;
  channelName?: string;
  disabled?: boolean;
}

export function MessageInput({ onSend, channelName, disabled }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-4 pb-6">
      <div className="flex items-end gap-2 bg-input rounded-lg px-4 py-3">
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 text-muted-foreground hover:text-foreground h-8 w-8"
          disabled={disabled}
        >
          <PlusCircle className="w-5 h-5" />
        </Button>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Message #${channelName || 'channel'}`}
          disabled={disabled}
          className="flex-1 bg-transparent border-none outline-none resize-none text-foreground placeholder:text-muted-foreground min-h-[24px] max-h-[120px] py-0"
          rows={1}
          style={{
            height: 'auto',
            overflow: message.split('\n').length > 4 ? 'auto' : 'hidden',
          }}
        />
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 text-muted-foreground hover:text-foreground h-8 w-8"
          disabled={disabled}
        >
          <Smile className="w-5 h-5" />
        </Button>
        <Button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          size="icon"
          className="shrink-0 h-8 w-8 bg-primary hover:bg-primary/90 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
