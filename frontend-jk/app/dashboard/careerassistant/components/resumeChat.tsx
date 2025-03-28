'use client'

import { addNewBioToDb } from '@/app/actions/databaseActions';
import { useJkAiChatHook } from '@/app/helpers/providers/aiResumeProvider';
import { useJobKompassTheme } from '@/app/helpers/providers/themeProvider';
import { useJobKompassToast } from '@/app/helpers/providers/toastProvider';
import { useJobKompassUser } from '@/app/helpers/providers/userProvider';
import { JkSelect } from '@/app/jkComponents/jkSelect';
import { JkTextArea } from '@/app/jkComponents/jkTextArea';
import { Message } from '@ai-sdk/react';
import { Copy, Settings2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export const ResumeChat = ({
    messages, 
    setMessages, 
    input, 
    setInput, 
    handleSubmit, 
    isLoading,
    additionalResumeContext,
    setAdditionalResumeContext,
    selectedBio,
    setSelectedBio
}: {
    messages: any;
    setMessages: (messages: any) => void;
    input: string;
    setInput: (input: string) => void;
    handleSubmit: (e: any) => void;
    isLoading: boolean;
    additionalResumeContext: string;
    setAdditionalResumeContext: (context: string) => void;
    selectedBio: string;
    setSelectedBio: (bio: string) => void;
}) => {
    const { styles } = useJobKompassTheme();
    const { isOpen, setIsOpen } = useJkAiChatHook();
    const [addingAdditionalContext, setAddingAdditionalContext] = useState(false)
    const [theBio, setTheBio] = useState('');
    const { user, userDataIsLoading } = useJobKompassUser();
    const { setToastIsVisible, setToastMessage, setToastHeader, setToastType } = useJobKompassToast();

    useEffect(() => {
        const scrollToBottom = () => {
            const element = document.getElementById('place-to-autoscroll');
            element?.scrollIntoView({ behavior: 'smooth' });
        };
        scrollToBottom();
    }, [messages, isLoading]);

    const handleAddAdditionalContext = (theContext: string) => {

        setAdditionalResumeContext(theContext)

        const receivedExtraContext: Message = {
            id: Date.now().toString(),
            role: 'assistant',
            content: "I have received your additional context, when you are ready, press the robot button in the tools to generate your resume.",
        };
        // Use callback form of setMessages to ensure we're working with the latest state
        setMessages((prevMessages: any) => [...prevMessages, receivedExtraContext]);
    }

    const handleBioAddition = (bioText: string) => {

        const selectedBio = user?.[0]?.bios?.find(bio => bio.text === bioText);
        setTheBio(bioText);

        const receivedExtraContext: Message = {
            id: Date.now().toString(),
            role: 'assistant',
            content: `I have received " ${selectedBio?.title} ", when you are ready, press the robot button in the tools to generate your resume.`,
        };
        // Use callback form of setMessages to ensure we're working with the latest state
        setMessages((prevMessages: any) => [...prevMessages, receivedExtraContext]);
    }

    const formatBiosForSelect = () => {
        console.log("user bios:", user?.[0]?.bios); // Debug log
        if (!user?.[0]?.bios) return [];
        const formattedBios = user[0].bios.map(bio => ({
            label: bio.title,
            value: bio.text
        }));
        console.log("formatted bios:", formattedBios); // Debug log
        return formattedBios;
    };

    const ChatTools = ({ message }: { message: string }) => {
        
        const [showOptions, setShowOptions] = useState(false)

        const copyMessage = () => {
            navigator.clipboard.writeText(message)            .then(() =>  {
                console.log('✅✅✅✅ Ccopied to clipboard ✅✅✅✅');
                setToastIsVisible(true)
                setToastMessage('Copied to clipboard')
                setToastHeader('Success')
                setTimeout(() => {
                    setToastIsVisible(false)
                    setToastMessage('')
                    setToastType("none")
                }, 6180)
            }).catch((err) => {
                console.error('❌❌❌❌ Failed to copy to clipboard ❌❌❌❌', err);
                setToastIsVisible(true)
                setToastMessage('Failed to copy to clipboard')
                setToastHeader('Error')
                setTimeout(() => {
                    setToastIsVisible(false)
                    setToastMessage('')
                    setToastType("none")
                }, 6180)
            }); 
        }

        const saveBio = async () => {
            if (!user) return;

            const saveIt = await addNewBioToDb(message, user)

            if (saveIt.status === 'success') {
                setToastIsVisible(true)
                setToastMessage('Bio saved successfully')
                setToastHeader('Success')
                setTimeout(() => {
                    setToastIsVisible(false)
                    setToastMessage('')
                    setToastType("none")
                }, 6180)
            } else {
                setToastIsVisible(true)
                setToastMessage('Failed to save bio')
                setToastHeader('Error')
                setTimeout(() => {
                    setToastIsVisible(false)
                    setToastMessage('')
                    setToastType("none")
                }, 6180)
            }

        }
    
        return (
            <span className="flex mt-2 gap-2 place-items-center justify-content-center justify-end w-full">
               
               {showOptions && (
                <>
                    <button
                        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:translate-y-[-2px]"
                        style={{
                            backgroundColor: `${styles.nav.colors.careerAssistant}20`,
                            color: styles.text.primary,
                            border: styles.card.border
                        }}
                        onClick={() => setShowOptions(false)}
                    >
                        Close
                        </button>
                    <button
                        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:translate-y-[-2px]"
                        style={{
                            backgroundColor: `${styles.nav.colors.careerAssistant}20`,
                            color: styles.text.primary,
                            border: styles.card.border
                        }}
                        onClick={saveBio}
                    >
                        Save as a bio
                    </button>
                    <button
                        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:translate-y-[-2px]"
                        style={{
                            backgroundColor: `${styles.nav.colors.careerAssistant}20`,
                            color: styles.text.primary,
                            border: styles.card.border
                        }}
                        onClick={copyMessage}
                    >
                        <Copy className="h-[16px] w-[16px]"/>
                    </button>
                </>
               )}

               {showOptions === false && (
                <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:translate-y-[-2px]"
                    style={{
                        backgroundColor: `${styles.nav.colors.careerAssistant}20`,
                        color: styles.text.primary,
                        border: styles.card.border
                    }}
                    onClick={() => setShowOptions(true)}
                >
                    <Settings2 className="h-[16px] w-[16px]"/>
                </button>
               )}
            </span>
        )
    }

    return (
        <div className="sticky bottom-0 h-full flex flex-col items-end">
                <div
                    className="w-full h-full relative place-items-center no-scrollbar rounded-lg p-4 flex flex-col"
                    style={{
                        // backgroundColor: styles.background,
                        border: styles.card.border,
                        boxShadow: styles.card.boxShadow,
                    }}
                >

                    <div className="flex flex-col h-full w-full overflow-y-auto no-scrollbar mb-4">
                        <div className="space-y-4 w-full no-scrollbar">
                            {messages.map((message: any, index: number) => (
                                <div
                                    key={index}
                                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className="flex items-start gap-2">
                                        <div
                                            className={`max-w-[600px] px-2 py-1 rounded-lg`}
                                            style={{
                                                backgroundColor: message.role === 'assistant' ? styles.card.background : styles.nav.colors.careerAssistant,
                                                color: message.role === 'assistant' ? styles.text.primary : styles.white
                                            }}
                                        >
                                            {message.role === 'user' ? (
                                                <ReactMarkdown className="prose prose-sm dark:prose-invert max-w-none">
                                                    {message.content}
                                                </ReactMarkdown>
                                            ) : (
                                                <>
                                                    <ReactMarkdown className="prose prose-sm dark:prose-invert max-w-none">
                                                        {message.content}
                                                    </ReactMarkdown>
                                                    <ChatTools message={message.content}/>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {isLoading && (
                            <div className="flex items-center gap-2 text-sm mt-2" style={{ color: styles.text.secondary }}>
                                <div className="animate-pulse h-2 w-2 rounded-full bg-current"></div>
                                AI is thinking...
                            </div>
                        )}
                        <span id='place-to-autoscroll'/>
                    </div>

                    <div className="flex flex-col w-full h-max">
                    
                    <div className="flex gap-2 place-items-center justify-content-center  overflow-x-scroll no-scrollbar">
                        <div 
                            style={{
                                backgroundColor: styles.form.input.background,
                                border: styles.form.input.border,
                                color: styles.text.primary
                            }}
                        onClick={() => setAddingAdditionalContext(!addingAdditionalContext)} className="cursor-pointer max-w-[350px] px-3 py-2  rounded-lg">
                            <h2>Add more context</h2>
                        </div>
                        <div className="max-w-[35opx]">

                            <JkSelect
                                user={user}
                                label=""
                                options={formatBiosForSelect()}
                                triggerText='Add your bio'
                                value={selectedBio}
                                onChange={(value) => {
                                    setSelectedBio(value);
                                    handleBioAddition(value); // This will trigger the message update
                                }}
                                />
                        </div>
                    </div>

                    {addingAdditionalContext === false && (
                        <form onSubmit={handleSubmit} className="flex w-full sticky justify-content-end  place-items-end no-scrollbar gap-2">
                            <JkTextArea
                             user={user}
                             label=''
                             type='text'
                             maxlen={1000000}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                                style={{
                                    backgroundColor: styles.form.input.background,
                                    border: styles.form.input.border,
                                    color: styles.text.primary
                                }}
                                placeholderText="Type your message..."
                            />
                            <button
                                type="submit"
                                className="px-6 py-2 h-[40px] mb-2 rounded-lg transition-colors"
                                style={{
                                    backgroundColor: styles.nav.colors.careerAssistant,
                                    color: styles.white,
                                }}
                                disabled={isLoading}
                            >
                                Send
                            </button>
                        </form> 
                    )}

                    {addingAdditionalContext === true && (
                     <div className="flex w-full sticky place-items-end  no-scrollbar gap-2">
                        <JkTextArea
                            user={user}
                            label=''
                            type='text'
                            maxlen={100000}
                            value={additionalResumeContext}
                            onChange={(e) => setAdditionalResumeContext(e.target.value)}
                            className="flex-1 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                            style={{
                                backgroundColor: styles.form.input.background,
                                border: styles.form.input.border,
                                color: styles.text.primary
                            }}
                            placeholderText="Type your message..."
                        />
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-lg mb-2 transition-colors"
                            style={{
                                backgroundColor: styles.nav.colors.careerAssistant,
                                color: styles.white,
                            }}
                            onClick={() => handleAddAdditionalContext(additionalResumeContext)}
                        >
                            Set
                        </button>
                    </div> 
                    )}

                    </div>
                </div>
        </div>
    );
};