import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Plus, Edit2, Trash2, X, Save, Lock } from 'lucide-react';
import { Work } from '../types';

export function AdminWorks() {
  const { data, addWork, updateWork, deleteWork } = usePortfolio();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Work>>({});
  const [galleryInput, setGalleryInput] = useState('');
  const [beforeImage, setBeforeImage] = useState('');
  const [afterImage, setAfterImage] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [toolsInput, setToolsInput] = useState('');
  const [deliverablesInput, setDeliverablesInput] = useState('');

  const handleEdit = (work: Work) => {
    setFormData(work);
    setGalleryInput(work.gallery?.join('\n') || '');
    setBeforeImage(work.beforeAfter?.before || '');
    setAfterImage(work.beforeAfter?.after || '');
    setTagsInput(work.tags?.join(', ') || '');
    setToolsInput(work.tools?.join(', ') || '');
    setDeliverablesInput(work.deliverables?.join(', ') || '');
    setIsEditing(work.id);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      imageUrl: '',
      gallery: [],
      category: '',
      year: new Date().getFullYear().toString(),
      projectUrl: '',
      client: '',
      role: '',
      featured: false,
      accentColor: '#FFD700',
      isPrivate: false,
      password: '',
      duration: '',
      tags: [],
      tools: [],
      deliverables: []
    });
    setGalleryInput('');
    setBeforeImage('');
    setAfterImage('');
    setTagsInput('');
    setToolsInput('');
    setDeliverablesInput('');
    setIsAdding(true);
    setIsEditing(null);
  };

  const handleSave = () => {
    const finalData = {
      ...formData,
      gallery: galleryInput.split('\n').map(url => url.trim()).filter(url => url !== ''),
      beforeAfter: (beforeImage && afterImage) ? { before: beforeImage, after: afterImage } : undefined,
      tags: tagsInput.split(',').map(t => t.trim()).filter(t => t !== ''),
      tools: toolsInput.split(',').map(t => t.trim()).filter(t => t !== ''),
      deliverables: deliverablesInput.split(',').map(t => t.trim()).filter(t => t !== '')
    };

    if (isAdding) {
      addWork(finalData as Omit<Work, 'id'>);
      setIsAdding(false);
    } else if (isEditing) {
      updateWork(isEditing, finalData);
      setIsEditing(null);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(null);
    setFormData({});
    setGalleryInput('');
    setBeforeImage('');
    setAfterImage('');
    setTagsInput('');
    setToolsInput('');
    setDeliverablesInput('');
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tighter mb-2">Manage Works</h1>
          <p className="text-black/60 dark:text-white/60">Add, edit, or remove items from your portfolio.</p>
        </div>
        {!isAdding && !isEditing && (
          <button
            onClick={handleAdd}
            className="flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-4 sm:py-3 bg-primary text-black font-bold uppercase tracking-widest rounded-xl brutal-border brutal-shadow-hover transition-all"
          >
            <Plus size={20} /> Add New Work
          </button>
        )}
      </div>

      {(isAdding || isEditing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-card rounded-[1.5rem] md:rounded-[2rem] p-4 sm:p-6 md:p-8 brutal-border brutal-shadow w-full max-w-6xl max-h-[90vh] overflow-y-auto relative">
            <div className="flex justify-between items-center mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-display font-bold uppercase">{isAdding ? 'Add New Work' : 'Edit Work'}</h2>
            <button onClick={handleCancel} className="p-2 hover:bg-secondary/20 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-4 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-base"
                  placeholder="e.g. Neon Dreams"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2">Category</label>
                  <input
                    type="text"
                    value={formData.category || ''}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-4 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-base"
                    placeholder="e.g. Web Design"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2">Year</label>
                  <input
                    type="text"
                    value={formData.year || ''}
                    onChange={e => setFormData({ ...formData, year: e.target.value })}
                    className="w-full p-4 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-base"
                    placeholder="e.g. 2024"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2">Client</label>
                  <input
                    type="text"
                    value={formData.client || ''}
                    onChange={e => setFormData({ ...formData, client: e.target.value })}
                    className="w-full p-4 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-base"
                    placeholder="e.g. Acme Corp"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2">Your Role</label>
                  <input
                    type="text"
                    value={formData.role || ''}
                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                    className="w-full p-4 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-base"
                    placeholder="e.g. Lead Designer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2">Duration</label>
                  <input
                    type="text"
                    value={formData.duration || ''}
                    onChange={e => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full p-4 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-base"
                    placeholder="e.g. 3 Months"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2">Tags (Comma separated)</label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={e => setTagsInput(e.target.value)}
                    className="w-full p-4 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-base"
                    placeholder="e.g. UI/UX, Branding"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2">Tools (Comma separated)</label>
                  <input
                    type="text"
                    value={toolsInput}
                    onChange={e => setToolsInput(e.target.value)}
                    className="w-full p-4 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-base"
                    placeholder="e.g. Figma, React"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2">Deliverables (Comma separated)</label>
                  <input
                    type="text"
                    value={deliverablesInput}
                    onChange={e => setDeliverablesInput(e.target.value)}
                    className="w-full p-4 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-base"
                    placeholder="e.g. Website, Logo"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2">Accent Color</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={formData.accentColor || '#FFD700'}
                      onChange={e => setFormData({ ...formData, accentColor: e.target.value })}
                      className="w-12 h-12 p-1 bg-transparent border-2 border-border rounded-xl cursor-pointer"
                    />
                    <span className="font-mono text-sm opacity-70">{formData.accentColor || '#FFD700'}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest mb-2">Project URL</label>
                  <input
                    type="text"
                    value={formData.projectUrl || ''}
                    onChange={e => setFormData({ ...formData, projectUrl: e.target.value })}
                    className="w-full p-3 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-sm"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="p-4 border-2 border-border rounded-xl bg-secondary/10">
                <div className="flex items-center gap-3 mb-4">
                  <input
                    type="checkbox"
                    id="isPrivate"
                    checked={formData.isPrivate || false}
                    onChange={e => setFormData({ ...formData, isPrivate: e.target.checked })}
                    className="w-5 h-5 rounded border-2 border-border text-accent dark:text-primary focus:ring-accent dark:focus:ring-primary"
                  />
                  <label htmlFor="isPrivate" className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                    <Lock size={16} /> Password Protect (NDA)
                  </label>
                </div>
                {formData.isPrivate && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2">Password</label>
                    <input
                      type="text"
                      value={formData.password || ''}
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                      className="w-full p-3 bg-card border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-sm"
                      placeholder="Enter password for clients..."
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold uppercase tracking-widest mb-2">Hero Image URL</label>
                <input
                  type="text"
                  value={formData.imageUrl || ''}
                  onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full p-4 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-base"
                  placeholder="https://..."
                />
              </div>

              <div className="p-4 border-2 border-border rounded-xl bg-secondary/10 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest">Before & After Slider (Optional)</h3>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-1">Before Image URL (e.g. Wireframe)</label>
                  <input
                    type="text"
                    value={beforeImage}
                    onChange={e => setBeforeImage(e.target.value)}
                    className="w-full p-3 bg-card border-2 border-border rounded-xl focus:outline-none focus:border-primary text-sm"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-1">After Image URL (e.g. Final Render)</label>
                  <input
                    type="text"
                    value={afterImage}
                    onChange={e => setAfterImage(e.target.value)}
                    className="w-full p-3 bg-card border-2 border-border rounded-xl focus:outline-none focus:border-primary text-sm"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold uppercase tracking-widest mb-2">Client Testimonial (Optional)</label>
                <select
                  value={formData.testimonial?.id || ''}
                  onChange={e => {
                    const selectedId = e.target.value;
                    if (!selectedId) {
                      setFormData({ ...formData, testimonial: undefined });
                    } else {
                      const selectedTestimonial = data.profile.testimonials?.find(t => t.id === selectedId);
                      setFormData({ ...formData, testimonial: selectedTestimonial });
                    }
                  }}
                  className="w-full p-4 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-base appearance-none"
                >
                  <option value="">-- No Testimonial --</option>
                  {data.profile.testimonials?.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.clientName} - {t.company || 'Client'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3 mt-6 p-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured || false}
                  onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-6 h-6 rounded border-2 border-border text-accent dark:text-primary focus:ring-accent dark:focus:ring-primary"
                />
                <label htmlFor="featured" className="text-sm font-bold uppercase tracking-widest">Feature on homepage</label>
              </div>
            </div>
            
            <div className="space-y-4 flex flex-col">
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest mb-2">Short Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-4 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors h-24 resize-none text-base"
                  placeholder="Brief summary for the card..."
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-bold uppercase tracking-widest mb-2">Full Case Study / Details</label>
                <textarea
                  value={formData.content || ''}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                  className="w-full p-4 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors h-64 lg:h-full resize-none text-base"
                  placeholder="Detailed explanation of the project, your role, the outcome..."
                />
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest mb-2">Gallery Image URLs (One per line)</label>
                <textarea
                  value={galleryInput}
                  onChange={e => setGalleryInput(e.target.value)}
                  className="w-full p-4 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors h-32 resize-none text-base font-mono text-sm"
                  placeholder="https://image1.jpg&#10;https://image2.jpg"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <button
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-6 py-4 sm:py-3 font-bold uppercase tracking-widest rounded-xl hover:bg-secondary/20 transition-colors border-2 border-transparent hover:border-border"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-4 sm:py-3 bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest rounded-xl brutal-border brutal-shadow-hover transition-all"
                >
                  <Save size={20} /> Save Work
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {data.works.map(work => (
          <div key={work.id} className="bg-card rounded-[1.5rem] md:rounded-[2rem] p-4 brutal-border brutal-shadow group flex flex-col">
            <div className="aspect-video rounded-xl overflow-hidden mb-4 brutal-border relative">
              <img src={work.imageUrl} alt={work.title} className="w-full h-full object-cover" />
              {work.featured && (
                <div className="absolute top-2 right-2 px-3 py-1 bg-primary text-black text-xs font-bold uppercase tracking-wider rounded-full brutal-border">
                  Featured
                </div>
              )}
              {work.isPrivate && (
                <div className="absolute top-2 left-2 px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full brutal-border flex items-center gap-1">
                  <Lock size={12} /> Private
                </div>
              )}
            </div>
            <div className="px-2 flex-1 flex flex-col">
              <h3 className="text-xl font-display font-bold uppercase mb-1 truncate">{work.title}</h3>
              <p className="text-sm opacity-70 mb-4">{work.category}</p>
              
              <div className="mt-auto flex justify-between items-center pt-4 border-t-2 border-border/20">
                <button
                  onClick={() => handleEdit(work)}
                  className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-accent dark:hover:text-primary transition-colors p-2 -ml-2"
                >
                  <Edit2 size={16} /> Edit
                </button>
                <button
                  onClick={() => deleteWork(work.id)}
                  className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors p-2 -mr-2"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
