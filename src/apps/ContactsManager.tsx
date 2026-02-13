import React, { useState, useEffect } from 'react';
import { Contact, Mail, Phone, Plus, Search } from 'lucide-react';

export const ContactsManager: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const loadContacts = async () => {
    setLoading(true);
    try {
      const result = await window.mcp?.callTool('close_list_contacts', { _limit: 100 });
      if (result?.content?.[0]?.text) {
        const data = JSON.parse(result.content[0].text);
        setContacts(data.data || []);
      }
    } catch (error) {
      console.error('Failed to load contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const filteredContacts = contacts.filter(c =>
    c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.emails?.some((e: any) => e.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div style={{ background: '#1a1a1a', color: '#e0e0e0', minHeight: '100vh', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Contact size={32} color="#8b5cf6" />
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Contacts</h1>
          </div>
          <button
            onClick={() => window.mcp?.showPrompt('Create a new contact')}
            style={{
              background: '#8b5cf6',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Plus size={16} />
            New Contact
          </button>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ position: 'relative' }}>
            <Search
              size={20}
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666' }}
            />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: '#2a2a2a',
                border: '1px solid #3a3a3a',
                color: '#e0e0e0',
                padding: '12px 12px 12px 44px',
                borderRadius: '6px',
              }}
            />
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Loading...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => window.mcp?.showPrompt(`Show contact ${contact.id}`)}
                style={{
                  background: '#2a2a2a',
                  border: '1px solid #3a3a3a',
                  borderRadius: '8px',
                  padding: '16px',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#8b5cf6')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#3a3a3a')}
              >
                <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                  {contact.name || 'Unnamed Contact'}
                </div>
                {contact.title && (
                  <div style={{ fontSize: '13px', color: '#888', marginBottom: '12px' }}>
                    {contact.title}
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {contact.emails?.[0] && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                      <Mail size={14} color="#666" />
                      <span style={{ color: '#888' }}>{contact.emails[0].email}</span>
                    </div>
                  )}
                  {contact.phones?.[0] && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                      <Phone size={14} color="#666" />
                      <span style={{ color: '#888' }}>{contact.phones[0].phone}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsManager;
