import { Hash, Bell, Pin, Users, Search, Inbox, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Channel } from '@/hooks/useChannels';

interface ChatHeaderProps {
  channel: Channel | null;
}

export function ChatHeader({ channel }: ChatHeaderProps) {
  if (!channel) {
    return (
      <header className="h-12 border-b border-border flex items-center px-4">
        <span className="text-muted-foreground">Select a channel</span>
      </header>
    );
  }

  return (
    <header className="h-12 border-b border-border flex items-center px-4 gap-2">
      <div className="flex items-center gap-2 flex-1">
        <Hash className="w-5 h-5 text-muted-foreground" />
        <span className="font-semibold text-foreground">{channel.name}</span>
        {channel.description && (
          <>
            <div className="w-px h-6 bg-border mx-2" />
            <span className="text-sm text-muted-foreground truncate">
              {channel.description}
            </span>
          </>
        )}
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
          <Pin className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
          <Users className="w-5 h-5" />
        </Button>
        <div className="relative ml-2">
          <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search"
            className="h-7 w-36 pl-8 pr-2 rounded bg-secondary text-sm text-foreground placeholder:text-muted-foreground border-none outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
          <Inbox className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
          <HelpCircle className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
