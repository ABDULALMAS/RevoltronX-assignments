import React, { useEffect, useRef, useState } from 'react';

const VoiceSelectComponent = ({selectedVoice, setSelectedVoice}: any) => {
  const [voiceOptions, setVoiceOptions] = useState<any>([]);
  // const [selectedVoice, setSelectedVoice] = useState<any>(null);

  const populateVoiceList = () => {
    if (typeof speechSynthesis === 'undefined') {
      return;
    }

    const voices = speechSynthesis.getVoices();
    setVoiceOptions(voices);
  };

  useEffect(() => {
    populateVoiceList();

    if (
      typeof speechSynthesis !== 'undefined' &&
      speechSynthesis.onvoiceschanged !== undefined
    ) {
      speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    return () => {
      if (
        typeof speechSynthesis !== 'undefined' &&
        speechSynthesis.onvoiceschanged !== undefined
      ) {
        speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const handleVoiceChange = (event: any) => {
    // setSelectedVoice(event.target.value);
    // const newVoice = event.target.value;
    // setSelectedVoice(newVoice);

    const newVoiceIndex = event.target.selectedIndex;
    const newVoice = voiceOptions[newVoiceIndex];
    setSelectedVoice(newVoice);
  };

  return (
    <div>
      <select value={selectedVoice} onChange={handleVoiceChange}>
        {voiceOptions.map((voice: any) => (
          <option
            key={`${voice.name}-${voice.lang}`}
            value={`${voice.name}-${voice.lang}`}
          >
            {`${voice.name} (${voice.lang})${voice.default ? ' — DEFAULT' : ''}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VoiceSelectComponent;