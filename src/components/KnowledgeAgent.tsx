import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import './KnowledgeAgent.css';

interface Branch {
  id: string;
  name: string;
  notes: string[];
}

export default function KnowledgeAgent() {
  const [branches, setBranches] = useState<Branch[]>([
    { id: '1', name: 'Math', notes: [] },
    { id: '2', name: 'Science', notes: [] }
  ]);
  const [activeBranch, setActiveBranch] = useState('1');
  const [newBranchName, setNewBranchName] = useState('');
  const [noteInput, setNoteInput] = useState('');

  const addBranch = () => {
    if (newBranchName.trim()) {
      setBranches([...branches, { id: Date.now().toString(), name: newBranchName, notes: [] }]);
      setNewBranchName('');
    }
  };

  const addNote = () => {
    if (noteInput.trim()) {
      setBranches(branches.map(branch =>
        branch.id === activeBranch
          ? { ...branch, notes: [...branch.notes, noteInput] }
          : branch
      ));
      setNoteInput('');
    }
  };

  const currentBranch = branches.find(b => b.id === activeBranch);

  return (
    <Card className="knowledge-agent-container">
      <CardHeader>
        <CardTitle>Knowledge Agent</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="branches-list">
          {branches.map(branch => (
            <Button
              key={branch.id}
              variant={branch.id === activeBranch ? 'default' : 'outline'}
              onClick={() => setActiveBranch(branch.id)}
              className="branch-btn"
            >
              {branch.name}
            </Button>
          ))}
        </div>
        <div className="add-branch">
          <Input
            value={newBranchName}
            onChange={e => setNewBranchName(e.target.value)}
            placeholder="Add new branch/topic"
          />
          <Button onClick={addBranch}>Add Branch</Button>
        </div>
        <div className="add-note">
          <Input
            value={noteInput}
            onChange={e => setNoteInput(e.target.value)}
            placeholder={`Add note to ${currentBranch?.name}`}
          />
          <Button onClick={addNote}>Add Note</Button>
        </div>
        <div>
          <h3 className="notes-title">
            Notes for {currentBranch?.name}
          </h3>
          <ul className="notes-list">
            {currentBranch?.notes.map((note, idx) => (
              <li key={idx}>• {note}</li>
            ))}
            {currentBranch?.notes.length === 0 && <li className="empty">No notes yet.</li>}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
