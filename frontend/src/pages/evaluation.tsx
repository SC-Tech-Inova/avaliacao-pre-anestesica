import React, { useState } from 'react';

interface EvaluationFormData {
  details: string;
}

const EvaluationPage: React.FC = () => {
  const [formData, setFormData] = useState<EvaluationFormData>({ details: '' });

  const handleSavePDF = () => {
    console.log('Salvar PDF:', formData);
  };

  const handleSign = () => {
    console.log('Assinar:', formData);
  };

  return (
    <div>
      <h1>Avaliação Pré-Anestésica</h1>
      <form>
        <textarea
          placeholder="Detalhes da avaliação"
          value={formData.details}
          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
        />
        <button type="button" onClick={handleSavePDF}>
          Salvar em PDF
        </button>
        <button type="button" onClick={handleSign}>
          Assinar
        </button>
      </form>
    </div>
  );
};

export default EvaluationPage;
