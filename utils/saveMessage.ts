let knowledgeBase = ''; 
let isInitialized = false;

export function saveMessage(message: string, isInitialSetup: boolean) {
  console.log("saveMessage called with:", { message, isInitialSetup });
  console.log("Before saving - isInitialized:", isInitialized, "knowledgeBase:", knowledgeBase);

  if (isInitialSetup && !isInitialized) {
    knowledgeBase = message; 
    isInitialized = true; 
    console.log("Knowledge base initialized:", knowledgeBase);
    return { success: true, message: 'Knowledge base initialized successfully.' };
  } else if (!isInitialSetup) {
    return { success: true, message: 'Message received successfully.' };
  } else {
    return { success: false, message: 'Knowledge base is already initialized.' };
  }
}

export function getKnowledgeBase() {
  console.log("getKnowledgeBase called. isInitialized:", isInitialized);
  return isInitialized ? knowledgeBase : 'Knowledge base not initialized.';
}
