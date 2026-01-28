import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useChannels, Channel } from '@/hooks/useChannels';
import { useMessages } from '@/hooks/useMessages';
import { Sidebar } from '@/components/chat/Sidebar';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { MessageList } from '@/components/chat/MessageList';
import { MessageInput } from '@/components/chat/MessageInput';
import { supabase } from '@/integrations/supabase/client';

export default function Chat() {
  const { user } = useAuth();
  const { channels, loading: channelsLoading } = useChannels();
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | undefined>();
  const { messages, loading: messagesLoading, sendMessage } = useMessages(selectedChannelId);

  // Set initial channel
  useEffect(() => {
    if (channels.length > 0 && !selectedChannelId) {
      setSelectedChannelId(channels[0].id);
    }
  }, [channels, selectedChannelId]);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const { data } = await supabase
        .from('profiles')
        .select('username')
        .eq('user_id', user.id)
        .single();
      if (data) setUsername(data.username);
    };
    fetchProfile();
  }, [user]);

  const selectedChannel = channels.find((c) => c.id === selectedChannelId) || null;

  if (channelsLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse-dot" style={{ animationDelay: '0ms' }} />
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse-dot" style={{ animationDelay: '200ms' }} />
          <div className="w-3 h-3 bg-primary rounded-full animate-pulse-dot" style={{ animationDelay: '400ms' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <div className="w-60 shrink-0">
        <Sidebar
          channels={channels}
          selectedChannel={selectedChannelId}
          onSelectChannel={setSelectedChannelId}
          username={username}
        />
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        <ChatHeader channel={selectedChannel} />
        <MessageList
          messages={messages}
          loading={messagesLoading}
          currentUserId={user?.id}
        />
        <MessageInput
          onSend={sendMessage}
          channelName={selectedChannel?.name}
          disabled={!selectedChannel}
        />
      </div>
    </div>
  );
}
