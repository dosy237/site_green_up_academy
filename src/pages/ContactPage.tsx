import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MapPin, Phone, Mail, Clock, User } from 'lucide-react';
import { apiUrl } from '../lib/api';

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [contactInfo, setContactInfo] = useState({
    email: 'contact@green-up-academy.com',
    phone: '(+33) 7 51 36 09 44',
    address: '15 rue des halles, 75001 Paris',
    director: ''
  });

  React.useEffect(() => {
    fetch(apiUrl('/api/content'))
      .then(res => res.json())
      .then(data => {
        if (data.contact) {
          setContactInfo(prev => ({ ...prev, ...data.contact }));
        }
      })
      .catch(err => console.error('Failed to fetch contact info', err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(apiUrl('/api/send'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-white dark:bg-dark-bg">
      <div className="bg-white dark:bg-dark-surface py-16 border-b border-[#E0E0E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-heading text-[#2D2D2D] dark:text-white mb-4">
            Contactez-nous
          </h1>
          <p className="text-[#696969] dark:text-gray-400 mb-8">
            Une question sur nos formations ? Notre équipe est là pour vous répondre.
          </p>
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">
            Réponse sous 24h garantie
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <Card className="p-8">
            <h2 className="text-2xl font-heading text-[#2D2D2D] mb-6">
              Envoyez-nous un message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#696969] mb-1">
                    Nom
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] bg-white focus:ring-2 focus:ring-[#1FAB89] outline-none" />

                </div>
                <div>
                  <label className="block text-sm font-medium text-[#696969] mb-1">
                    Email
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] bg-white focus:ring-2 focus:ring-[#1FAB89] outline-none" />

                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#696969] mb-1">
                  Sujet
                </label>
                <input name="subject" value={form.subject} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] bg-white focus:ring-2 focus:ring-[#1FAB89] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#696969] mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] bg-white focus:ring-2 focus:ring-[#1FAB89] outline-none">
                </textarea>
              </div>
              <Button type="submit" className="w-full bg-[#1FAB89] hover:bg-[#15896B] text-white">
                {status === 'loading' ? 'Envoi...' : 'Envoyer'}
              </Button>
              {status === 'success' && <p className="text-green-600">Merci — votre message a été envoyé.</p>}
              {status === 'error' && <p className="text-red-600">Une erreur est survenue lors de l'envoi.</p>}
            </form>
          </Card>

          {/* Info */}
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="p-6 flex items-start gap-4">
                <MapPin className="h-6 w-6 text-[#1FAB89] shrink-0" />
                <div>
                  <h3 className="font-bold text-[#2D2D2D] mb-1">
                    Adresse
                  </h3>
                  <p className="text-sm text-[#696969]">
                    {contactInfo.address}
                  </p>
                </div>
              </Card>
              <Card className="p-6 flex items-start gap-4">
                <Phone className="h-6 w-6 text-[#1FAB89] shrink-0" />
                <div>
                  <h3 className="font-bold text-[#2D2D2D] mb-1">
                    Téléphone
                  </h3>
                  <p className="text-sm text-[#696969]">
                    {contactInfo.phone}
                  </p>
                </div>
              </Card>
              <Card className="p-6 flex items-start gap-4">
                <Mail className="h-6 w-6 text-[#1FAB89] shrink-0" />
                <div>
                  <h3 className="font-bold text-[#2D2D2D] mb-1">
                    Email
                  </h3>
                  <p className="text-sm text-[#696969]">
                    {contactInfo.email}
                  </p>
                </div>
              </Card>
              {contactInfo.director && (
                <Card className="p-6 flex items-start gap-4">
                  <User className="h-6 w-6 text-[#1FAB89] shrink-0" />
                  <div>
                    <h3 className="font-bold text-[#2D2D2D] mb-1">
                      Directeur
                    </h3>
                    <p className="text-sm text-[#696969]">
                      {contactInfo.director}
                    </p>
                  </div>
                </Card>
              )}
              <Card className="p-6 flex items-start gap-4">
                <Clock className="h-6 w-6 text-[#1FAB89] shrink-0" />
                <div>
                  <h3 className="font-bold text-[#2D2D2D] mb-1">
                    Horaires
                  </h3>
                  <p className="text-sm text-[#696969]">
                    Lun - Ven: 9h - 18h
                  </p>
                </div>
              </Card>
            </div>

            {/* Map Placeholder */}
            <div className="bg-[#F0F0F0] rounded-2xl h-64 w-full flex items-center justify-center text-[#696969]">
              <p>Google Maps Embed</p>
            </div>
          </div>
        </div>
      </div>
    </div>);

}