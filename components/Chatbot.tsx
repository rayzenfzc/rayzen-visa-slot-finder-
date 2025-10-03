import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import WhatsAppIcon from './icons/WhatsAppIcon';
import PaperAirplaneIcon from './icons/PaperAirplaneIcon';

type ChatStep =
  | 'idle'
  | 'asking_date'
  | 'asking_name'
  | 'asking_nationality'
  | 'asking_phone'
  | 'asking_country'
  | 'asking_schengen_country'
  | 'asking_visa_type'
  | 'summary'
  | 'finished';

interface Message {
  text: string;
  sender: 'bot' | 'user';
  options?: string[];
  inputType?: 'date' | 'text' | 'tel';
}

interface UserData {
  date: string;
  name: string;
  nationality: string;
  phoneNumber: string;
  country: string;
  schengenCountry?: string;
  visaType: string;
}

const Chatbot: React.FC = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState<ChatStep>('idle');
  const [userData, setUserData] = useState<Partial<UserData>>({});
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isTyping]);
  
  const addBotMessage = (text: string, options?: string[], inputType?: 'date' | 'text' | 'tel') => {
      setIsTyping(true);
      setTimeout(() => {
        setMessages(prev => [...prev, { text, sender: 'bot', options, inputType }]);
        setIsTyping(false);
      }, 1000);
  };
  
  const handleUserInput = (value: string) => {
    setMessages(prev => [...prev, { text: value, sender: 'user' }]);
    setInputValue('');

    const nextStepMap: Record<ChatStep, ChatStep> = {
      idle: 'asking_date',
      asking_date: 'asking_name',
      asking_name: 'asking_nationality',
      asking_nationality: 'asking_phone',
      asking_phone: 'asking_country',
      asking_country: value.toLowerCase() === 'schengen' ? 'asking_schengen_country' : 'asking_visa_type',
      asking_schengen_country: 'asking_visa_type',
      asking_visa_type: 'summary',
      summary: 'finished',
      finished: 'finished',
    };
    
    setUserData(prev => {
        switch(step) {
            case 'asking_date': return { ...prev, date: value };
            case 'asking_name': return { ...prev, name: value };
            case 'asking_nationality': return { ...prev, nationality: value };
            case 'asking_phone': return { ...prev, phoneNumber: value };
            case 'asking_country': return { ...prev, country: value };
            case 'asking_schengen_country': return { ...prev, schengenCountry: value };
            case 'asking_visa_type': return { ...prev, visaType: value };
            default: return prev;
        }
    });
    setStep(nextStepMap[step]);
  };
  
  useEffect(() => {
    if (step === 'idle') {
      setStep('asking_date');
    } else {
        switch(step) {
            case 'asking_date':
                addBotMessage(t('chatbotGreeting'), undefined, 'date');
                break;
            case 'asking_name':
                addBotMessage(t('chatbotAskName'), undefined, 'text');
                break;
            case 'asking_nationality':
                addBotMessage(t('chatbotAskNationality', { name: userData.name || '' }), undefined, 'text');
                break;
            case 'asking_phone':
                addBotMessage(t('chatbotAskPhoneNumber'), undefined, 'tel');
                break;
            case 'asking_country':
                addBotMessage(t('chatbotAskCountry'), ['USA', 'Schengen', 'UK', 'Canada', t('chatbotOther')]);
                break;
            case 'asking_schengen_country':
                addBotMessage(t('chatbotAskSchengenCountry'), undefined, 'text');
                break;
            case 'asking_visa_type':
                addBotMessage(t('chatbotAskVisaType'), undefined, 'text');
                break;
            case 'summary':
                let summaryText = `${t('chatbotSummary')}\n\n`;
                summaryText += `- ${t('chatbotSummaryName')}: ${userData.name}\n`;
                summaryText += `- ${t('chatbotSummaryNationality')}: ${userData.nationality}\n`;
                summaryText += `- ${t('chatbotSummaryPhoneNumber')}: ${userData.phoneNumber}\n`;
                summaryText += `- ${t('chatbotSummaryCountry')}: ${userData.country}`;
                if (userData.schengenCountry) {
                    summaryText += ` (${userData.schengenCountry})\n`;
                } else {
                    summaryText += `\n`;
                }
                summaryText += `- ${t('chatbotSummaryDate')}: ${userData.date}\n`;
                summaryText += `- ${t('chatbotSummaryVisaType')}: ${userData.visaType}`;
                
                addBotMessage(summaryText);
                setTimeout(() => {
                    addBotMessage(t('chatbotNextStep'));
                    setStep('finished');
                }, 1500);
                break;
        }
    }
  }, [step]);
  
  const handleConfirm = () => {
    const whatsappNumber = "971502189091";
    const messageTemplate = t('whatsappMessage');
    const message = messageTemplate
      .replace('{{name}}', userData.name || '')
      .replace('{{nationality}}', userData.nationality || '')
      .replace('{{phoneNumber}}', userData.phoneNumber || '')
      .replace('{{country}}', userData.country || '')
      .replace('{{schengenCountry}}', userData.schengenCountry ? ` (${userData.schengenCountry})` : '')
      .replace('{{date}}', userData.date || '')
      .replace('{{visaType}}', userData.visaType || '');
      
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const currentMessage = messages[messages.length - 1];
  const showInput = currentMessage?.sender === 'bot' && (currentMessage.inputType) && !isTyping;
  const showOptions = currentMessage?.sender === 'bot' && currentMessage.options && !isTyping;
  const showConfirm = step === 'finished' && !isTyping;

  return (
    <section id="apply" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">{t('ctaTitle')}</h2>
            <p className="text-lg text-slate-400 mt-3 lowercase font-semibold">{t('ctaSubtitle')}</p>
        </div>
        <div className="glass-card max-w-lg mx-auto h-[70vh] max-h-[600px] flex flex-col overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="flex-shrink-0 p-4 bg-gray-900/50 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                <WhatsAppIcon />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">{t('appNameFull')}</h3>
                <p className="text-sm text-slate-300">Visa Assistant</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-green-600 text-white rounded-br-lg' : 'bg-slate-700 text-slate-200 rounded-bl-lg'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-700 text-slate-200 rounded-bl-lg rounded-2xl px-4 py-2 inline-flex items-center gap-1">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-0"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-150"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-300"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex-shrink-0 p-3 border-t border-white/10 space-y-2">
              {showOptions && (
                  <div className="flex flex-wrap gap-2">
                      {currentMessage.options.map(option => (
                          <button key={option} onClick={() => handleUserInput(option)} className="px-4 py-2 bg-slate-600/50 hover:bg-slate-600 border border-slate-500 rounded-full text-sm text-white transition-colors">
                              {option}
                          </button>
                      ))}
                  </div>
              )}
              {showInput && (
                  <form onSubmit={(e) => { e.preventDefault(); if (inputValue) handleUserInput(inputValue); }} className="flex gap-2">
                      <input 
                          type={currentMessage.inputType || 'text'}
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder={t('chatbotInputPlaceholder')}
                          className="w-full form-input px-4 py-2 rounded-full text-white bg-slate-800 focus:ring-2 focus:ring-purple-500 outline-none"
                          autoFocus
                      />
                      <button type="submit" className="w-10 h-10 flex-shrink-0 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors">
                          <PaperAirplaneIcon />
                      </button>
                  </form>
              )}
              {showConfirm && (
                  <button
                    onClick={handleConfirm}
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 px-6 rounded-full text-lg hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105"
                  >
                    <WhatsAppIcon />
                    {t('chatbotConfirm')}
                  </button>
              )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chatbot;