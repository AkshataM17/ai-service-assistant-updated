// app/utils/saveMessage.ts

interface SaveMessageResponse {
    success: boolean;
    message: string;
  }
  
  export const saveMessage = async (
    input: string,
    isInitialSetup: boolean
  ): Promise<SaveMessageResponse> => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          isInitialSetup,
        }),
      });
  
      const data = await response.json();
      return {
        success: data.success,
        message: data.message,
      };
    } catch (error) {
      console.error('Error sending message:', error);
      return {
        success: false,
        message: "Sorry, there was an error processing your message.",
      };
    }
  };
  