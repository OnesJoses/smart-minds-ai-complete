/**
 * Study Groups Component
 * Collaborative learning spaces and group management
 */

import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Users, Plus, MessageCircle, Calendar, Video, BookOpen, Crown, UserPlus } from 'lucide-react'

interface StudyGroup {
  id: string
  name: string
  description: string
  subject: string
  members: number
  maxMembers: number
  isPrivate: boolean
  nextSession: Date
  owner: string
  avatar: string
}

interface GroupMessage {
  id: string
  groupId: string
  sender: string
  message: string
  timestamp: Date
}

export default function StudyGroups() {
  const [studyGroups] = useState<StudyGroup[]>([
    {
      id: '1',
      name: 'Advanced Mathematics Study Circle',
      description: 'Weekly sessions covering calculus, linear algebra, and advanced topics. Perfect for university students and professionals.',
      subject: 'Mathematics',
      members: 12,
      maxMembers: 15,
      isPrivate: false,
      nextSession: new Date('2024-12-30T19:00:00'),
      owner: 'Sarah Chen',
      avatar: 'https://pub-cdn.sider.ai/u/U0GVH7EAJYR/web-coder/68855adb94baea4807e9e8d1/resource/a6d507d0-9ec6-471f-8deb-d56dfbec1870.jpg'
    },
    {
      id: '2',
      name: 'AI & Machine Learning Hub',
      description: 'Exploring the latest in artificial intelligence, deep learning, and practical ML applications.',
      subject: 'Computer Science',
      members: 8,
      maxMembers: 12,
      isPrivate: false,
      nextSession: new Date('2024-12-28T20:30:00'),
      owner: 'Alex Rodriguez',
      avatar: 'https://pub-cdn.sider.ai/u/U0GVH7EAJYR/web-coder/68855adb94baea4807e9e8d1/resource/63852777-e4ca-44b2-b68a-354ad65636ae.jpg'
    },
    {
      id: '3',
      name: 'Medical School Prep Squad',
      description: 'Intensive preparation for MCAT and medical school entrance exams. Collaborative learning and practice tests.',
      subject: 'Medicine',
      members: 6,
      maxMembers: 8,
      isPrivate: true,
      nextSession: new Date('2024-12-29T18:00:00'),
      owner: 'Dr. Emily Watson',
      avatar: 'https://pub-cdn.sider.ai/u/U0GVH7EAJYR/web-coder/68855adb94baea4807e9e8d1/resource/bb019d35-eadd-4a70-aa3d-4db224f72cce.jpg'
    }
  ])

  const [groupMessages] = useState<GroupMessage[]>([
    {
      id: '1',
      groupId: '1',
      sender: 'Sarah Chen',
      message: 'Hey everyone! Don\'t forget about tomorrow\'s session on differential equations. I\'ve prepared some challenging problems for us to work through.',
      timestamp: new Date('2024-12-27T14:30:00')
    },
    {
      id: '2',
      groupId: '1',
      sender: 'Mike Johnson',
      message: 'Thanks Sarah! I\'ve been struggling with partial derivatives, so this will be really helpful.',
      timestamp: new Date('2024-12-27T15:15:00')
    }
  ])

  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    subject: '',
    maxMembers: 10,
    isPrivate: false
  })

  /**
   * Get messages for selected group
   */
  const getGroupMessages = (groupId: string) => {
    return groupMessages.filter(msg => msg.groupId === groupId)
  }

  /**
   * Send a new message to group
   */
  const sendMessage = () => {
    if (!newMessage.trim() || !selectedGroup) return
    // In a real app, this would send to backend
    setNewMessage('')
  }

  /**
   * Join a study group
   */
  const joinGroup = (groupId: string) => {
    // In a real app, this would send request to backend
    console.log('Joining group:', groupId)
  }

  /**
   * Create new study group
   */
  const createGroup = () => {
    if (!newGroup.name.trim()) return
    
    // In a real app, this would create group on backend
    setNewGroup({ name: '', description: '', subject: '', maxMembers: 10, isPrivate: false })
    setShowCreateGroup(false)
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-indigo-500" />
              <span>Study Groups</span>
            </div>
            <Button 
              onClick={() => setShowCreateGroup(true)}
              className="bg-indigo-500 hover:bg-indigo-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Group
            </Button>
          </CardTitle>
          <CardDescription>
            Join collaborative learning communities and study together
          </CardDescription>
        </CardHeader>
      </Card>

      {!selectedGroup ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studyGroups.map((group) => (
            <Card key={group.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-indigo-400 border-indigo-400/50">
                    {group.subject}
                  </Badge>
                  {group.isPrivate && (
                    <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300">
                      Private
                    </Badge>
                  )}
                </div>
                <img 
                  src={group.avatar} 
                  alt={group.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <CardTitle className="text-lg">{group.name}</CardTitle>
                <CardDescription className="text-sm line-clamp-2">
                  {group.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Members
                    </span>
                    <span>{group.members}/{group.maxMembers}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center">
                      <Crown className="h-4 w-4 mr-1 text-yellow-400" />
                      Owner
                    </span>
                    <span>{group.owner}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Next Session
                    </span>
                    <span>{group.nextSession.toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    onClick={() => setSelectedGroup(group.id)}
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent border-white/20"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Chat
                  </Button>
                  <Button 
                    onClick={() => joinGroup(group.id)}
                    size="sm"
                    className="flex-1 bg-indigo-500 hover:bg-indigo-600"
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    Join
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-6 w-6 text-indigo-500" />
                <span>{studyGroups.find(g => g.id === selectedGroup)?.name}</span>
              </CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="bg-transparent border-white/20">
                  <Video className="h-4 w-4 mr-2" />
                  Start Session
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedGroup(null)}
                  className="bg-transparent border-white/20"
                >
                  Back to Groups
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="chat" className="w-full">
              <TabsList className="bg-white/10">
                <TabsTrigger value="chat">Group Chat</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat" className="space-y-4">
                <div className="h-96 bg-white/5 rounded-lg p-4 overflow-y-auto space-y-3">
                  {getGroupMessages(selectedGroup).map((message) => (
                    <div key={message.id} className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {message.sender.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{message.sender}</span>
                        <span className="text-xs text-gray-400">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm ml-8 text-gray-300">{message.message}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1 bg-white/10 border-white/20"
                  />
                  <Button onClick={sendMessage} className="bg-indigo-500 hover:bg-indigo-600">
                    Send
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="resources" className="space-y-4">
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Shared Resources</h3>
                  <p className="text-gray-400 mb-4">Group members can share study materials, notes, and resources here</p>
                  <Button className="bg-indigo-500 hover:bg-indigo-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Resource
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="members" className="space-y-4">
                <div className="grid gap-3">
                  {[
                    { name: 'Sarah Chen', role: 'Owner', status: 'online' },
                    { name: 'Mike Johnson', role: 'Member', status: 'offline' },
                    { name: 'Lisa Wang', role: 'Member', status: 'online' },
                    { name: 'David Brown', role: 'Moderator', status: 'away' }
                  ].map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-gray-400">{member.role}</p>
                        </div>
                      </div>
                      <Badge 
                        variant={member.status === 'online' ? 'default' : 'secondary'}
                        className={
                          member.status === 'online' ? 'bg-green-500/20 text-green-300' :
                          member.status === 'away' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-gray-500/20 text-gray-300'
                        }
                      >
                        {member.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Create Group Modal */}
      {showCreateGroup && (
        <Card className="fixed inset-4 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-white/20 overflow-auto">
          <CardHeader>
            <CardTitle>Create New Study Group</CardTitle>
            <CardDescription>Start a new collaborative learning community</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Group name..."
              value={newGroup.name}
              onChange={(e) => setNewGroup(prev => ({ ...prev, name: e.target.value }))}
              className="bg-white/10 border-white/20"
            />
            <Input
              placeholder="Subject (e.g., Mathematics, Computer Science)..."
              value={newGroup.subject}
              onChange={(e) => setNewGroup(prev => ({ ...prev, subject: e.target.value }))}
              className="bg-white/10 border-white/20"
            />
            <Input
              placeholder="Group description..."
              value={newGroup.description}
              onChange={(e) => setNewGroup(prev => ({ ...prev, description: e.target.value }))}
              className="bg-white/10 border-white/20"
            />
            <Input
              type="number"
              placeholder="Maximum members..."
              value={newGroup.maxMembers}
              onChange={(e) => setNewGroup(prev => ({ ...prev, maxMembers: parseInt(e.target.value) || 10 }))}
              className="bg-white/10 border-white/20"
            />
            <div className="flex space-x-2">
              <Button onClick={createGroup} className="bg-indigo-500 hover:bg-indigo-600">
                Create Group
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowCreateGroup(false)}
                className="bg-transparent border-white/20"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}