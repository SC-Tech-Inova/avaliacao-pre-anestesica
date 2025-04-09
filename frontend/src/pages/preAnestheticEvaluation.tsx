import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';

type FormData = {
  [key: string]: any; // Suporte para índices dinâmicos
  patientName: string;
  patientAge: string;
  evaluationDate: string;
  proposedSurgery: string;
  previousSurgeries: string;
  intercorrencia: string;
  intercorrenciaDetails: string;
  familyComplication: string;
  familyComplicationDetails: string;
  medicationAllergy: string;
  medicationAllergyDetails: string;
  cardiovascularIssues: {
    hypertension: boolean;
    heartFailure: boolean;
    myocardialInfarction: boolean;
    arrhythmias: boolean;
  };
  endocrineIssues: {
    diabetesMellitus: boolean;
    hypothyroidism: boolean;
    hyperthyroidism: boolean;
  };
  respiratoryIssues: {
    asthma: boolean;
    bronchitis: boolean;
  };
  neurologicalIssues: {
    stroke: boolean;
    alzheimer: boolean;
    parkinson: boolean;
    seizures: boolean;
    motorDeficit: boolean;
  };
  currentMedications: string;
  exams: {
    hb: string;
    ht: string;
    bloodSugar: string;
    urea: string;
    creatinine: string;
    tp: string;
    ttpa: string;
    rni: string;
    platelets: string;
    sodium: string;
    potassium: string;
    acv: string;
    ar: string;
  };
  vitals: {
    bloodPressure: string;
    heartRate: string;
    weight: string;
    height: string;
    mallampati: string;
  };
  functionalCapacity: string;
  dentalProsthesis: string;
  asaClassification: string;
  ecg: string;
  chestXray: string;
  additionalTests: string;
  specialistEvaluation: string;
  fastingSolidsVerified: boolean;
  fastingLiquidsVerified: boolean;
  fastingObservations: string;
  bloodTransfusionConsent: boolean;
  proposedAnesthesia: string;
  releasedForProcedure: boolean;
  doctorSignature: string;
  digitalSignature: string;
};

const PreAnestheticEvaluation: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    patientName: '',
    patientAge: '',
    evaluationDate: new Date().toISOString().slice(0, 10),
    proposedSurgery: '',
    previousSurgeries: '',
    intercorrencia: 'não',
    intercorrenciaDetails: '',
    familyComplication: 'não',
    familyComplicationDetails: '',
    medicationAllergy: 'não',
    medicationAllergyDetails: '',
    cardiovascularIssues: {
      hypertension: false,
      heartFailure: false,
      myocardialInfarction: false,
      arrhythmias: false,
    },
    endocrineIssues: {
      diabetesMellitus: false,
      hypothyroidism: false,
      hyperthyroidism: false,
    },
    respiratoryIssues: {
      asthma: false,
      bronchitis: false,
    },
    neurologicalIssues: {
      stroke: false,
      alzheimer: false,
      parkinson: false,
      seizures: false,
      motorDeficit: false,
    },
    currentMedications: '',
    exams: {
      hb: '',
      ht: '',
      bloodSugar: '',
      urea: '',
      creatinine: '',
      tp: '',
      ttpa: '',
      rni: '',
      platelets: '',
      sodium: '',
      potassium: '',
      acv: '',
      ar: '',
    },
    vitals: {
      bloodPressure: '',
      heartRate: '',
      weight: '',
      height: '',
      mallampati: '1',
    },
    functionalCapacity: '',
    dentalProsthesis: 'não',
    asaClassification: 'ASA I',
    ecg: '',
    chestXray: '',
    additionalTests: '',
    specialistEvaluation: '',
    fastingSolidsVerified: false,
    fastingLiquidsVerified: false,
    fastingObservations: '',
    bloodTransfusionConsent: false,
    proposedAnesthesia: '',
    releasedForProcedure: false,
    doctorSignature: '',
    digitalSignature: '',
  });



  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
  
    // Verifica se o elemento é um input e se é do tipo checkbox
    const isCheckbox = (e.target as HTMLInputElement).type === 'checkbox';
    const checked = (e.target as HTMLInputElement).checked;
  
    const [category, field] = name.split('.'); // Exemplo: "exams.hb" -> ["exams", "hb"]
  
    if (category in formData && typeof formData[category] === 'object') {
      setFormData((prev) => ({
        ...prev,
        [category]: {
          ...(prev[category] as object),
          [field]: isCheckbox ? checked : value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: isCheckbox ? checked : value,
      });
    }
  };

  const handleBack = () => {
    router.push('/patientList');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do formulário enviados:', formData);    
    const pdfResponse = await fetch(`/api/evaluation/${formData.evaluationId}/pdf`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/pdf' },
    });

    if (pdfResponse.ok) {
        const blob = await pdfResponse.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `evaluation-${formData.evaluationId}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
    } else {
        alert('Falha ao gerar o PDF.');
    }

    try {
      const response = await fetch('/api/submit-evaluation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Formulário enviado com sucesso!');
        router.push('/patientList');
      } else {
        alert('Falha ao enviar o formulário.');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Ficha de Avaliação Pré-Anestésica</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informações do Paciente */}
            <div>
              <h2 className="text-lg font-bold mb-4">Informações do Paciente</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label>Nome do Paciente</label>
                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label>Idade</label>
                  <input
                    type="number"
                    name="patientAge"
                    value={formData.patientAge}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label>Data da Avaliação</label>
                  <input
                    type="date"
                    name="evaluationDate"
                    value={formData.evaluationDate}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label>Cirurgia Proposta</label>
                  <input
                    type="text"
                    name="proposedSurgery"
                    value={formData.proposedSurgery}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label>Cirurgias Prévias</label>
                  <Textarea
                    name="previousSurgeries"
                    value={formData.previousSurgeries}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Intercorrências e Complicações */}
            <div>
              <h2 className="text-lg font-bold mb-4">Intercorrências e Complicações</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label>Intercorrência</label>
                  <select
                    name="intercorrencia"
                    value={formData.intercorrencia}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="sim">Sim</option>
                    <option value="não">Não</option>
                  </select>
                </div>
                <div>
                  <label>Detalhes</label>
                  <Textarea
                    name="intercorrenciaDetails"
                    value={formData.intercorrenciaDetails}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label>Complicação Anestésica na Família</label>
                  <select
                    name="familyComplication"
                    value={formData.familyComplication}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="sim">Sim</option>
                    <option value="não">Não</option>
                  </select>
                </div>
                <div>
                  <label>Detalhes</label>
                  <Textarea
                    name="familyComplicationDetails"
                    value={formData.familyComplicationDetails}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            {/* Dados Vitais */}
            <div>
              <h2 className="text-lg font-bold mb-4">Dados Vitais</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Pressão Arterial (mmHg):</label>
                  <input
                    type="number"
                    name="vitals.bloodPressure"
                    value={formData.vitals.bloodPressure}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Frequência Cardíaca (bpm):</label>
                  <input
                    type="number"
                    name="vitals.heartRate"
                    value={formData.vitals.heartRate}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Peso (kg):</label>
                  <input
                    type="number"
                    name="vitals.weight"
                    value={formData.vitals.weight}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Altura (cm):</label>
                  <input
                    type="number"
                    name="vitals.height"
                    value={formData.vitals.height}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mallampati:</label>
                  <select
                    name="vitals.mallampati"
                    value={formData.vitals.mallampati}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>
            </div>

           {/* Cardiovascular Section */}
<div className="space-y-4">
  <h3 className="text-lg font-semibold">Cardiovascular</h3>
  <div className="grid grid-cols-2 gap-4">
    <div className="flex items-center">
      <input
        type="checkbox"
        id="hypertension"
        name="hypertension"
        checked={formData.cardiovascularIssues.hypertension}

        onChange={handleChange}
        className="h-4 w-4 align-middle mr-2"
      />
      <label htmlFor="hypertension" className="text-sm font-medium text-gray-700">
        Hipertensão Arterial
      </label>
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        id="heartFailure"
        name="heartFailure"
        checked={formData.cardiovascularIssues.heartFailure}

        onChange={handleChange}
        className="h-4 w-4 align-middle mr-2"
      />
      <label htmlFor="heartFailure" className="text-sm font-medium text-gray-700">
        Insuficiência Cardíaca
      </label>
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        id="myocardialInfarction"
        name="myocardialInfarction"
        checked={formData.cardiovascularIssues.myocardialInfarction}

        onChange={handleChange}
        className="h-4 w-4 align-middle mr-2"
      />
      <label htmlFor="myocardialInfarction" className="text-sm font-medium text-gray-700">
        Infarto Agudo do Miocárdio
      </label>
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        id="arrhythmia"
        name="arrhythmia"
        checked={formData.cardiovascularIssues.arrhythmias}

        onChange={handleChange}
        className="h-4 w-4 align-middle mr-2"
      />
      <label htmlFor="arrhythmia" className="text-sm font-medium text-gray-700">
        Arritmias
      </label>
    </div>
  </div>
</div>

{/* Endocrine Section */}
<div className="space-y-4">
  <h3 className="text-lg font-semibold">Endócrino</h3>
  <div className="grid grid-cols-2 gap-4">
    <div className="flex items-center">
      <input
        type="checkbox"
        id="diabetesMellitus"
        name="diabetesMellitus"
        checked={formData.endocrineIssues.diabetesMellitus}

        onChange={handleChange}
        className="h-4 w-4 align-middle mr-2"
      />
      <label htmlFor="diabetesMellitus" className="text-sm font-medium text-gray-700">
        Diabetes Mellitus
      </label>
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        id="hypothyroidism"
        name="hypothyroidism"
        checked={formData.endocrineIssues.hypothyroidism}

        onChange={handleChange}
        className="h-4 w-4 align-middle mr-2"
      />
      <label htmlFor="hypothyroidism" className="text-sm font-medium text-gray-700">
        Hipotireoidismo
      </label>
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        id="hyperthyroidism"
        name="hyperthyroidism"
        checked={formData.endocrineIssues.hyperthyroidism}

        onChange={handleChange}
        className="h-4 w-4 align-middle mr-2"
      />
      <label htmlFor="hyperthyroidism" className="text-sm font-medium text-gray-700">
        Hipertireoidismo
      </label>
    </div>
  </div>
</div>

{/* Respiratory Section */}
<div className="space-y-4">
  <h3 className="text-lg font-semibold">Respiratório</h3>
  <div className="grid grid-cols-2 gap-4">
    <div className="flex items-center">
      <input
        type="checkbox"
        id="asthma"
        name="asthma"
        checked={formData.respiratoryIssues.asthma}

        onChange={handleChange}
        className="h-4 w-4 align-middle mr-2"
      />
      <label htmlFor="asthma" className="text-sm font-medium text-gray-700">
        Asma
      </label>
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        id="bronchitis"
        name="bronchitis"
        checked={formData.respiratoryIssues.bronchitis}

        onChange={handleChange}
        className="h-4 w-4 align-middle mr-2"
      />
      <label htmlFor="bronchitis" className="text-sm font-medium text-gray-700">
        Bronquite
      </label>
    </div>
  </div>
</div>

{/* Neurological Section */}
<div className="space-y-4">
  <h3 className="text-lg font-semibold">Neurológico</h3>
  <div className="grid grid-cols-2 gap-4">
    <div className="flex items-center">
      <input
        type="checkbox"
        id="stroke"
        name="stroke"
        checked={formData.neurologicalIssues.stroke}

        onChange={handleChange}
        className="h-4 w-4 align-middle mr-2"
      />
      <label htmlFor="stroke" className="text-sm font-medium text-gray-700">
        AVC
      </label>
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        id="alzheimer"
        name="alzheimer"
        checked={formData.neurologicalIssues.alzheimer}

        onChange={handleChange}
        className="h-4 w-4 align-middle mr-2"
      />
      <label htmlFor="alzheimer" className="text-sm font-medium text-gray-700">
        Alzheimer
      </label>
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        id="parkinson"
        name="parkinson"
        checked={formData.neurologicalIssues.parkinson}

        onChange={handleChange}
        className="h-4 w-4 align-middle mr-2"
      />
      <label htmlFor="parkinson" className="text-sm font-medium text-gray-700">
        Parkinson
      </label>
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        id="seizure"
        name="seizure"
        checked={formData.neurologicalIssues.seizures}

        onChange={handleChange}
        className="h-4 w-4 align-middle mr-2"
      />
      <label htmlFor="seizure" className="text-sm font-medium text-gray-700">
        Crise Convulsiva
      </label>
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        id="motorDeficit"
        name="motorDeficit"
        checked={formData.neurologicalIssues.motorDeficit}

        onChange={handleChange}
        className="h-4 w-4 align-middle mr-2"
      />
      <label htmlFor="motorDeficit" className="text-sm font-medium text-gray-700">
        Déficit Motor
      </label>
    </div>
  </div>
</div>

{/* Current Medications */}
<div className="space-y-4">
  <label className="text-sm font-medium text-gray-700">Medicações em Uso:</label>
  <Textarea
    id="currentMedications"
    name="currentMedications"
    value={formData.currentMedications}
    onChange={handleChange}
    placeholder="Liste as medicações em uso"
    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
  />
</div>

            {/* Classificação ASA */}
            <div>
              <h2 className="text-lg font-bold mb-4">Classificação ASA</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Capacidade Funcional (METs):</label>
                  <input
                    type="text"
                    name="functionalCapacity"
                    value={formData.functionalCapacity}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Prótese Dentária:</label>
                  <select
                    name="dentalProsthesis"
                    value={formData.dentalProsthesis}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="não">Não</option>
                    <option value="sim">Sim</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Classificação ASA:</label>
                  <select
                    name="asaClassification"
                    value={formData.asaClassification}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="ASA I">ASA I</option>
                    <option value="ASA II">ASA II</option>
                    <option value="ASA III">ASA III</option>
                    <option value="ASA IV">ASA IV</option>
                    <option value="ASA V">ASA V</option>
                  </select>
                </div>
              </div>
            </div>

             {/* Exames */}
<div>
  <h2 className="text-lg font-bold mb-4">Exames</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* Hb */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Hb (g/dl):</label>
      <input
        type="text"
        name="exams.hb"
        value={formData.exams.hb}
        onChange={handleChange}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    {/* Ht */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Ht (%):</label>
      <input
        type="number"
        name="exams.ht"
        value={formData.exams.ht}
        onChange={handleChange}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    {/* Glicemia */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Glicemia (mg/dl):</label>
      <input
        type="number"
        name="exams.bloodSugar"
        value={formData.exams.bloodSugar}
        onChange={handleChange}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    {/* Uréia */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Uréia (mg/dl):</label>
      <input
        type="text"
        name="exams.urea"
        value={formData.exams.urea}
        onChange={handleChange}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    {/* Creatinina */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Creatinina (mg/dl):</label>
      <input
        type="text"
        name="exams.creatinine"
        value={formData.exams.creatinine}
        onChange={handleChange}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    {/* TP */}
    <div>
      <label className="block text-sm font-medium text-gray-700">TP (s):</label>
      <input
        type="text"
        name="exams.tp"
        value={formData.exams.tp}
        onChange={handleChange}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    {/* TTPA */}
    <div>
      <label className="block text-sm font-medium text-gray-700">TTPA (s):</label>
      <input
        type="text"
        name="exams.ttpa"
        value={formData.exams.ttpa}
        onChange={handleChange}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    {/* RNI */}
    <div>
      <label className="block text-sm font-medium text-gray-700">RNI:</label>
      <input
        type="text"
        name="exams.rni"
        value={formData.exams.rni}
        onChange={handleChange}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    {/* Plaquetas */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Plaquetas (x10³/mm³):</label>
      <input
        type="text"
        name="exams.platelets"
        value={formData.exams.platelets}
        onChange={handleChange}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    {/* Sódio */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Sódio (mEq/L):</label>
      <input
        type="text"
        name="exams.sodium"
        value={formData.exams.sodium}
        onChange={handleChange}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    {/* Potássio */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Potássio (mEq/L):</label>
      <input
        type="text"
        name="exams.potassium"
        value={formData.exams.potassium}
        onChange={handleChange}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    {/* ACV */}
    <div>
      <label className="block text-sm font-medium text-gray-700">ACV (ml):</label>
      <input
        type="text"
        name="exams.acv"
        value={formData.exams.acv}
        onChange={handleChange}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    {/* AR */}
    <div>
      <label className="block text-sm font-medium text-gray-700">AR (ml):</label>
      <input
        type="text"
        name="exams.ar"
        value={formData.exams.ar}
        onChange={handleChange}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  </div>
</div>


            {/* Exames Complementares */}
            <div>
              <h2 className="text-lg font-bold mb-4">Exames Complementares</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">ECG:</label>
                  <Textarea
                    name="ecg"
                    value={formData.ecg}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Raio-X Tórax:</label>
                  <Textarea
                    name="chestXray"
                    value={formData.chestXray}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Outros Exames:</label>
                  <Textarea
                    name="additionalTests"
                    value={formData.additionalTests}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
      {/* Jejum */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <h2 className="text-lg font-bold mb-4 col-span-1 md:col-span-2">Jejum e Transfusão</h2>
        
        {/* Jejum Section */}
        <div className="col-span-1 md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap w-[350px]">
                  Jejum para alimentos sólidos de 08 horas antes do procedimento cirúrgico.
                </span>
                <input
                  type="checkbox"
                  name="fastingSolidsVerified"
                  checked={formData.fastingSolidsVerified || false}
                  onChange={handleChange}
                  className="ml-2"
                />
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap w-[350px]">
                  Jejum para líquidos claros de 02 horas antes do procedimento cirúrgico.
                </span>
                <input
                  type="checkbox"
                  name="fastingLiquidsVerified"
                  checked={formData.fastingLiquidsVerified || false}
                  onChange={handleChange}
                  className="ml-2"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700">
                Observações sobre Jejum:
              </label>
              <Textarea
                name="fastingObservations"
                value={formData.fastingObservations}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Transfusão Section */}
        <div className="col-span-1 md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700">
                Autorização para receber concentrado de hemácias:
              </label>
              <select
                name="bloodTransfusionConsent"
                value={formData.bloodTransfusionConsent ? 'Sim' : 'Não'}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Sim">Sim</option>
                <option value="Não">Não</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-between mt-6">
        <Button onClick={handleBack} className="bg-gray-500 text-white px-4 py-2 rounded">
          Voltar
        </Button>
        <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Salvar
        </Button>
      </div>
       </form>
        </CardContent>
          </Card>
        </div>
  );
};

export default PreAnestheticEvaluation;
