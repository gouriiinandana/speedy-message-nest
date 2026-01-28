import { Hash, Settings, LogOut, MessageSquare } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Channel } from '@/hooks/useChannels';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  channels: Channel[];
  selectedChannel: string | null;
  onSelectChannel: (id: string) => void;
  username?: string;
}

export function Sidebar({ channels, selectedChannel, onSelectChannel, username }: SidebarProps) {
  const { signOut, user } = useAuth();

  return (
    <div className="flex flex-col h-full bg-chat-sidebar">
      {/* Server header */}
      <div className="h-14 px-4 flex items-center border-b border-sidebar-border shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="font-bold text-foreground">ChatApp</h1>
        </div>
      </div>

      {/* Channels list */}
      <div className="flex-1 overflow-y-auto scrollbar-thin py-4">
        <div className="px-3 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Text Channels
          </span>
        </div>
        <nav className="space-y-0.5 px-2">
          {channels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => onSelectChannel(channel.id)}
              className={cn(
                "w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors",
                selectedChannel === channel.id
                  ? "bg-sidebar-accent text-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
              )}
            >
              <Hash className="w-4 h-4 shrink-0" />
              <span className="truncate">{channel.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* User panel */}
      <div className="h-14 px-2 flex items-center gap-2 bg-chat-sidebar border-t border-sidebar-border">
        <div className="flex items-center gap-2 flex-1 px-1 py-1 rounded hover:bg-sidebar-accent/50 cursor-pointer">
          <div className="relative">
            <Avatar className="w-8 h-8">
              <AvatarImage src={undefined} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {(username || user?.email)?.[0]?.toUpperCase() || '?'}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-chat-online rounded-full border-2 border-chat-sidebar" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-foreground">
              {username || user?.email?.split('@')[0]}
            </p>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={signOut}
          className="text-muted-foreground hover:text-foreground shrink-0"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
