import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Save, Plus, X, Trash2 } from 'lucide-react';
import { Service, Testimonial } from '../types';

export function AdminProfile() {
  const { data, updateProfile } = usePortfolio();
  const [formData, setFormData] = useState(data.profile);
  const [isSaved, setIsSaved] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  const handleSave = () => {
    updateProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleAddSkill = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ((e.type === 'keydown' && (e as React.KeyboardEvent).key !== 'Enter') || !newSkill.trim()) return;
    
    if (!formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()]
      });
    }
    setNewSkill('');
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skillToRemove)
    });
  };

  const addService = () => {
    const newService: Service = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Service',
      price: 'Starts at $0',
      description: 'Describe what you offer here.'
    };
    setFormData({
      ...formData,
      services: [...(formData.services || []), newService]
    });
  };

  const updateService = (id: string, field: keyof Service, value: string) => {
    setFormData({
      ...formData,
      services: formData.services.map(s => s.id === id ? { ...s, [field]: value } : s)
    });
  };

  const removeService = (id: string) => {
    setFormData({
      ...formData,
      services: formData.services.filter(s => s.id !== id)
    });
  };

  const addTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: Math.random().toString(36).substr(2, 9),
      clientName: 'Client Name',
      company: 'Company',
      text: 'Amazing work!',
      avatarUrl: ''
    };
    setFormData({
      ...formData,
      testimonials: [...(formData.testimonials || []), newTestimonial]
    });
  };

  const updateTestimonial = (id: string, field: keyof Testimonial, value: string) => {
    setFormData({
      ...formData,
      testimonials: formData.testimonials?.map(t => t.id === id ? { ...t, [field]: value } : t) || []
    });
  };

  const removeTestimonial = (id: string) => {
    setFormData({
      ...formData,
      testimonials: formData.testimonials?.filter(t => t.id !== id) || []
    });
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tighter mb-2">Edit Profile</h1>
          <p className="text-black/60 dark:text-white/60">Update your personal information, services, and links.</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-4 sm:py-3 bg-primary text-black font-bold uppercase tracking-widest rounded-xl brutal-border brutal-shadow-hover transition-all"
        >
          <Save size={20} /> {isSaved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-card rounded-[1.5rem] md:rounded-[2rem] p-4 sm:p-6 md:p-8 brutal-border brutal-shadow space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-xl md:text-2xl font-display font-bold uppercase border-b-2 border-border pb-4">Basic Info</h2>
            
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-4 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-4 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-2">WhatsApp Number (with country code)</label>
              <input
                type="text"
                value={formData.whatsapp || ''}
                onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full p-4 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-base"
                placeholder="+919876543210"
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-2">Hero Image URL</label>
              <input
                type="text"
                value={formData.heroImage}
                onChange={e => setFormData({ ...formData, heroImage: e.target.value })}
                className="w-full p-4 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-base"
              />
            </div>

            <div className="flex items-center gap-3 p-2 border-2 border-border rounded-xl">
              <input
                type="checkbox"
                id="freelance"
                checked={formData.availableForFreelance}
                onChange={e => setFormData({ ...formData, availableForFreelance: e.target.checked })}
                className="w-6 h-6 rounded border-2 border-border text-accent dark:text-primary focus:ring-accent dark:focus:ring-primary ml-2"
              />
              <label htmlFor="freelance" className="text-sm font-bold uppercase tracking-widest">Available for Freelance</label>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl md:text-2xl font-display font-bold uppercase border-b-2 border-border pb-4">Links & Socials</h2>
            
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-2">Resume / CV URL</label>
              <input
                type="text"
                value={formData.resumeUrl || ''}
                onChange={e => setFormData({ ...formData, resumeUrl: e.target.value })}
                className="w-full p-4 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-base"
                placeholder="https://drive.google.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-2">Instagram URL</label>
              <input
                type="text"
                value={formData.socialLinks.instagram || ''}
                onChange={e => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, instagram: e.target.value } })}
                className="w-full p-4 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-2">LinkedIn URL</label>
              <input
                type="text"
                value={formData.socialLinks.linkedin || ''}
                onChange={e => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, linkedin: e.target.value } })}
                className="w-full p-4 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-widest mb-2">Twitter URL</label>
              <input
                type="text"
                value={formData.socialLinks.twitter || ''}
                onChange={e => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, twitter: e.target.value } })}
                className="w-full p-4 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-base"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-8 border-t-2 border-border">
          <h2 className="text-xl md:text-2xl font-display font-bold uppercase border-b-2 border-border pb-4">About Me</h2>
          
          <div>
            <label className="block text-sm font-bold uppercase tracking-widest mb-2">Tagline (Hero Section)</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={e => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full p-4 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-bold uppercase tracking-widest mb-2">Full Bio</label>
            <textarea
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-4 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors h-48 resize-none text-base"
            />
          </div>
        </div>

        <div className="space-y-6 pt-8 border-t-2 border-border">
          <div className="flex justify-between items-center border-b-2 border-border pb-4">
            <h2 className="text-xl md:text-2xl font-display font-bold uppercase">Services & Pricing</h2>
            <button 
              onClick={addService}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-black font-bold uppercase tracking-widest rounded-xl brutal-border text-sm"
            >
              <Plus size={16} /> Add Service
            </button>
          </div>

          <div className="space-y-6">
            {formData.services?.map((service, index) => (
              <div key={service.id} className="p-6 border-2 border-border rounded-2xl relative bg-secondary/5">
                <button 
                  onClick={() => removeService(service.id)}
                  className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                >
                  <Trash2 size={20} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-12">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-1">Service Title</label>
                    <input
                      type="text"
                      value={service.title}
                      onChange={e => updateService(service.id, 'title', e.target.value)}
                      className="w-full p-3 bg-card border-2 border-border rounded-xl focus:outline-none focus:border-primary text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-1">Pricing / Rate</label>
                    <input
                      type="text"
                      value={service.price}
                      onChange={e => updateService(service.id, 'price', e.target.value)}
                      className="w-full p-3 bg-card border-2 border-border rounded-xl focus:outline-none focus:border-primary text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-1">Description</label>
                  <textarea
                    value={service.description}
                    onChange={e => updateService(service.id, 'description', e.target.value)}
                    className="w-full p-3 bg-card border-2 border-border rounded-xl focus:outline-none focus:border-primary h-24 resize-none text-sm"
                  />
                </div>
              </div>
            ))}
            {(!formData.services || formData.services.length === 0) && (
              <p className="text-sm opacity-60 italic text-center py-8">No services added. Click "Add Service" to list your offerings.</p>
            )}
          </div>
        </div>

        <div className="space-y-6 pt-8 border-t-2 border-border">
          <div className="flex justify-between items-center border-b-2 border-border pb-4">
            <h2 className="text-xl md:text-2xl font-display font-bold uppercase">Testimonials</h2>
            <button 
              onClick={addTestimonial}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-black font-bold uppercase tracking-widest rounded-xl brutal-border text-sm"
            >
              <Plus size={16} /> Add Testimonial
            </button>
          </div>

          <div className="space-y-6">
            {formData.testimonials?.map((testimonial, index) => (
              <div key={testimonial.id} className="p-6 border-2 border-border rounded-2xl relative bg-secondary/5">
                <button 
                  onClick={() => removeTestimonial(testimonial.id)}
                  className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                >
                  <Trash2 size={20} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-12">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-1">Client Name</label>
                    <input
                      type="text"
                      value={testimonial.clientName}
                      onChange={e => updateTestimonial(testimonial.id, 'clientName', e.target.value)}
                      className="w-full p-3 bg-card border-2 border-border rounded-xl focus:outline-none focus:border-primary text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-1">Company / Role</label>
                    <input
                      type="text"
                      value={testimonial.company || ''}
                      onChange={e => updateTestimonial(testimonial.id, 'company', e.target.value)}
                      className="w-full p-3 bg-card border-2 border-border rounded-xl focus:outline-none focus:border-primary text-sm"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-bold uppercase tracking-widest mb-1">Avatar URL (Optional)</label>
                  <input
                    type="text"
                    value={testimonial.avatarUrl || ''}
                    onChange={e => updateTestimonial(testimonial.id, 'avatarUrl', e.target.value)}
                    className="w-full p-3 bg-card border-2 border-border rounded-xl focus:outline-none focus:border-primary text-sm"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-1">Testimonial Text</label>
                  <textarea
                    value={testimonial.text}
                    onChange={e => updateTestimonial(testimonial.id, 'text', e.target.value)}
                    className="w-full p-3 bg-card border-2 border-border rounded-xl focus:outline-none focus:border-primary h-24 resize-none text-sm"
                  />
                </div>
              </div>
            ))}
            {(!formData.testimonials || formData.testimonials.length === 0) && (
              <p className="text-sm opacity-60 italic text-center py-8">No testimonials added yet.</p>
            )}
          </div>
        </div>

        <div className="space-y-6 pt-8 border-t-2 border-border">
          <h2 className="text-xl md:text-2xl font-display font-bold uppercase border-b-2 border-border pb-4">Skills & Tools</h2>
          
          <div>
            <label className="block text-sm font-bold uppercase tracking-widest mb-2">Add a Skill</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                onKeyDown={handleAddSkill}
                className="flex-1 p-4 bg-transparent border-2 border-border rounded-xl focus:outline-none focus:border-primary transition-colors text-base"
                placeholder="e.g. React, Figma, Blender..."
              />
              <button 
                onClick={handleAddSkill}
                className="px-6 py-4 bg-black text-white dark:bg-white dark:text-black font-bold rounded-xl brutal-border hover:bg-primary hover:text-black transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            {formData.skills.map(skill => (
              <div key={skill} className="flex items-center gap-2 px-4 py-2 bg-secondary/20 rounded-full brutal-border">
                <span className="font-bold uppercase tracking-wider text-sm">{skill}</span>
                <button 
                  onClick={() => removeSkill(skill)}
                  className="p-1 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black rounded-full transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            {formData.skills.length === 0 && (
              <p className="text-sm opacity-60 italic">No skills added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
