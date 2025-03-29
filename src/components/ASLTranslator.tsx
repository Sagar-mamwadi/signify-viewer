
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, CameraOff, RotateCcw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ASLTranslator = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const { toast } = useToast();
  
  const toggleCamera = () => {
    if (isCameraActive) {
      setIsCameraActive(false);
      setIsTranslating(false);
      toast({
        title: "Camera stopped",
        description: "The camera has been turned off.",
      });
    } else {
      setIsCameraActive(true);
      toast({
        title: "Camera activated",
        description: "Please allow camera access if prompted.",
      });
      
      // Simulate loading translated text
      setTimeout(() => {
        setIsTranslating(true);
        simulateTranslation();
      }, 2000);
    }
  };
  
  const resetTranslation = () => {
    setTranslatedText("");
    toast({
      title: "Translation reset",
      description: "The translation has been cleared.",
    });
  };
  
  const simulateTranslation = () => {
    const examplePhrases = [
      "Hello, how are you?",
      "My name is...",
      "Thank you",
      "Nice to meet you",
      "I understand"
    ];
    
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < examplePhrases.length && isCameraActive) {
        setTranslatedText(prev => 
          prev ? `${prev}\n\n${examplePhrases[currentIndex]}` : examplePhrases[currentIndex]
        );
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  };

  return (
    <section id="translator" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">ASL Translator</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our translator converts American Sign Language to text in real-time. 
            Activate your camera and start signing to see the translation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Left side - Camera */}
          <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden">
            <div className="camera-container">
              {isCameraActive ? (
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-navy/5 animate-pulse"></div>
                </div>
              ) : (
                <div className="camera-overlay">
                  <Camera size={48} className="text-gold mb-4" />
                  <p>Camera is inactive</p>
                  <p className="text-sm text-gray-400 mt-2">Click the button below to start</p>
                </div>
              )}
            </div>
            <div className="p-4 bg-navy text-white flex justify-between items-center">
              <span className={`text-sm ${isCameraActive ? 'text-gold' : 'text-white/70'}`}>
                {isCameraActive ? 'Camera Active' : 'Camera Inactive'}
              </span>
              <Button
                onClick={toggleCamera}
                variant={isCameraActive ? "destructive" : "default"}
                className={isCameraActive ? "bg-red-600 hover:bg-red-700" : "bg-gold hover:bg-gold/90 text-navy"}
              >
                {isCameraActive ? (
                  <>
                    <CameraOff size={16} className="mr-2" />
                    Stop Camera
                  </>
                ) : (
                  <>
                    <Camera size={16} className="mr-2" />
                    Start Camera
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {/* Right side - Text output */}
          <div className="bg-gray-100 rounded-lg shadow-md flex flex-col">
            <div className="p-4 bg-navy text-white flex justify-between items-center">
              <span className="font-medium">Translated Text</span>
              <Button
                onClick={resetTranslation}
                variant="outline"
                className="border-gold/50 text-gold hover:bg-navy hover:text-gold/80"
                disabled={!translatedText}
              >
                <RotateCcw size={16} className="mr-2" />
                Reset
              </Button>
            </div>
            <div className="output-container flex-grow">
              {isTranslating ? (
                <div className="h-full">
                  {translatedText ? (
                    <p className="text-navy whitespace-pre-line">{translatedText}</p>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-gray-500 animate-pulse">Analyzing gestures...</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500">
                    {isCameraActive 
                      ? "Getting ready..." 
                      : "Waiting for camera to be activated"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center text-gray-600 max-w-3xl mx-auto">
          <p className="text-sm">
            <span className="font-medium text-navy">Note:</span> For best results, 
            ensure you're in a well-lit environment and position your hands clearly 
            in front of the camera.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ASLTranslator;
