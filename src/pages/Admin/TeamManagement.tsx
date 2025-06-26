import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { toast } from 'sonner';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface TeamMember {
  id?: string;
  name: string;
  role: string;
  image_url: string;
  linkedin_url?: string;
}

const TeamManagement: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formState, setFormState] = useState<TeamMember>({ name: '', role: '', image_url: '', linkedin_url: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadMethod, setUploadMethod] = useState<'url' | 'upload'>('url');
  const [imagePreview, setImagePreview] = useState<string>('');

  const fetchTeamMembers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('team_members').select('*').order('created_at');
      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error: any) {
      toast.error('Failed to fetch team members: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const handleOpenModal = (member: TeamMember | null = null) => {
    setEditingMember(member);
    if (member) {
      setFormState(member);
      setImagePreview(member.image_url);
    } else {
      setFormState({ name: '', role: '', image_url: '', linkedin_url: '' });
      setImagePreview('');
    }
    setImageFile(null);
    setUploadMethod('url');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingMember(null);
    setFormState({ name: '', role: '', image_url: '', linkedin_url: '' });
    setImageFile(null);
    setImagePreview('');
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setFormState({ ...formState, image_url: '' }); // Clear URL when file is selected
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let finalImageUrl = formState.image_url;

    try {
      if (uploadMethod === 'upload' && imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`; // No 'public/' prefix needed for public buckets

        const { error: uploadError } = await supabase.storage
          .from('team-avatars')
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('team-avatars')
          .getPublicUrl(filePath);
        
        finalImageUrl = urlData.publicUrl;
      }

      const dataToSave = {
        name: formState.name,
        role: formState.role,
        image_url: finalImageUrl,
        linkedin_url: formState.linkedin_url,
      };

      if (editingMember) {
        // Update
        const { error } = await supabase.from('team_members').update(dataToSave).eq('id', editingMember.id);
        if (error) throw error;
        toast.success('Team member updated successfully!');
      } else {
        // Create
        const { error } = await supabase.from('team_members').insert(dataToSave);
        if (error) throw error;
        toast.success('Team member added successfully!');
      }
      fetchTeamMembers();
      handleCloseModal();
    } catch (error: any) {
      toast.error('Error saving team member: ' + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        const { error } = await supabase.from('team_members').delete().eq('id', id);
        if (error) throw error;
        toast.success('Team member deleted.');
        fetchTeamMembers();
      } catch (error: any) {
        toast.error('Failed to delete team member: ' + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Manage Team</h3>
            <button onClick={() => handleOpenModal()} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
              <Plus size={18} /> Add Member
            </button>
          </div>
          {loading ? (
            <p>Loading team members...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="p-4">Avatar</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map(member => (
                    <tr key={member.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <img src={member.image_url || '/images/avatar-placeholder.png'} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
                      </td>
                      <td className="p-4 font-semibold">{member.name}</td>
                      <td className="p-4">{member.role}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleOpenModal(member)} className="text-blue-600 p-1 hover:text-blue-800"><Edit size={18} /></button>
                          <button onClick={() => handleDelete(member.id!)} className="text-red-600 p-1 hover:text-red-800"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-6">{editingMember ? 'Edit' : 'Add'} Team Member</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})} className="w-full border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role / Position</label>
                  <input type="text" value={formState.role} onChange={(e) => setFormState({...formState, role: e.target.value})} className="w-full border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL (Optional)</label>
                  <input type="url" value={formState.linkedin_url || ''} onChange={(e) => setFormState({...formState, linkedin_url: e.target.value})} className="w-full border-gray-300 rounded-md shadow-sm" placeholder="https://linkedin.com/in/..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                   <div className="flex items-center space-x-4 mb-2">
                    <label className="flex items-center">
                      <input type="radio" name="uploadMethod" value="url" checked={uploadMethod === 'url'} onChange={() => { setUploadMethod('url'); setImageFile(null); setImagePreview(formState.image_url); }} className="form-radio text-blue-600" />
                      <span className="ml-2 text-sm">From URL</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="uploadMethod" value="upload" checked={uploadMethod === 'upload'} onChange={() => { setUploadMethod('upload'); setFormState({ ...formState, image_url: '' }); }} className="form-radio text-blue-600" />
                      <span className="ml-2 text-sm">Upload File</span>
                    </label>
                  </div>
                  {uploadMethod === 'url' ? (
                    <input type="url" value={formState.image_url} onChange={(e) => { setFormState({...formState, image_url: e.target.value}); setImagePreview(e.target.value); }} className="w-full border-gray-300 rounded-md shadow-sm" placeholder="https://example.com/image.png" />
                  ) : (
                    <input type="file" onChange={handleImageFileChange} accept="image/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                  )}
                  {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 rounded-lg max-h-40 mx-auto" />}
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-8">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement; 