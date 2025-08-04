/**
 * Knowledge Hub Component
 * Personal note-taking and knowledge management system
 */

import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Plus, Search, BookOpen, Tag, Calendar, Star } from 'lucide-react'

interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  category: string
  createdAt: Date
  isFavorite: boolean
}

export default function KnowledgeHub() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Machine Learning Fundamentals',
      content: 'Machine learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed. Key concepts include:\n\n• Supervised Learning: Learning with labeled examples\n• Unsupervised Learning: Finding patterns in data\n• Reinforcement Learning: Learning through trial and error\n• Neural Networks: Mimicking brain structure for complex problems',
      tags: ['AI', 'Technology', 'Data Science'],
      category: 'Computer Science',
      createdAt: new Date('2024-01-15'),
      isFavorite: true
    },
    {
      id: '2',
      title: 'Effective Study Techniques',
      content: 'Research-backed study methods for better learning:\n\n1. Spaced Repetition: Review material at increasing intervals\n2. Active Recall: Test yourself instead of re-reading\n3. Interleaving: Mix different topics during study sessions\n4. Elaborative Interrogation: Ask "why" and "how" questions\n5. Self-explanation: Explain concepts in your own words',
      tags: ['Study Tips', 'Learning', 'Productivity'],
      category: 'Education',
      createdAt: new Date('2024-01-10'),
      isFavorite: false
    }
  ])
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showAddNote, setShowAddNote] = useState(false)
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    tags: '',
    category: ''
  })

  /**
   * Get unique categories from notes
   */
  const categories = ['all', ...Array.from(new Set(notes.map(note => note.category)))]

  /**
   * Filter notes based on search and category
   */
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  /**
   * Add a new note
   */
  const addNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      tags: newNote.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      category: newNote.category || 'General',
      createdAt: new Date(),
      isFavorite: false
    }

    setNotes(prev => [note, ...prev])
    setNewNote({ title: '', content: '', tags: '', category: '' })
    setShowAddNote(false)
  }

  /**
   * Toggle favorite status
   */
  const toggleFavorite = (noteId: string) => {
    setNotes(prev => prev.map(note => 
      note.id === noteId ? { ...note, isFavorite: !note.isFavorite } : note
    ))
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-green-500" />
              <span>Knowledge Hub</span>
            </div>
            <Button 
              onClick={() => setShowAddNote(true)}
              className="bg-green-500 hover:bg-green-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          </CardTitle>
          <CardDescription>
            Organize your learning materials, notes, and insights in one place
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search notes, tags, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20"
                />
              </div>
              <TabsList className="bg-white/10">
                {categories.map(category => (
                  <TabsTrigger key={category} value={category} className="capitalize">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {categories.map(category => (
              <TabsContent key={category} value={category} className="space-y-4">
                <div className="grid gap-4">
                  {filteredNotes.map(note => (
                    <Card key={note.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg">{note.title}</CardTitle>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavorite(note.id)}
                            className="p-1"
                          >
                            <Star className={`h-4 w-4 ${note.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                          </Button>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>{note.createdAt.toLocaleDateString()}</span>
                          <Badge variant="outline" className="ml-2">
                            {note.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 mb-3 whitespace-pre-wrap line-clamp-3">
                          {note.content}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {note.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="bg-blue-500/20 text-blue-300">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Add Note Modal */}
      {showAddNote && (
        <Card className="fixed inset-4 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-white/20 overflow-auto">
          <CardHeader>
            <CardTitle>Add New Note</CardTitle>
            <CardDescription>Create a new note to add to your knowledge base</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Note title..."
              value={newNote.title}
              onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
              className="bg-white/10 border-white/20"
            />
            <Input
              placeholder="Category (e.g., Computer Science, Mathematics)..."
              value={newNote.category}
              onChange={(e) => setNewNote(prev => ({ ...prev, category: e.target.value }))}
              className="bg-white/10 border-white/20"
            />
            <Input
              placeholder="Tags (comma-separated)..."
              value={newNote.tags}
              onChange={(e) => setNewNote(prev => ({ ...prev, tags: e.target.value }))}
              className="bg-white/10 border-white/20"
            />
            <Textarea
              placeholder="Write your note content here..."
              value={newNote.content}
              onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
              rows={10}
              className="bg-white/10 border-white/20"
            />
            <div className="flex space-x-2">
              <Button onClick={addNote} className="bg-green-500 hover:bg-green-600">
                Save Note
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowAddNote(false)}
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