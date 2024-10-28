import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import api from "../../service";
import { useNavigate } from "react-router-dom";

interface CommissionData {
    cpf: string;
    value: number;
    date: string;
}

export function CommisionCreate() {
    const [cpf, setCPF] = useState<string>("");
    const [value, setValue] = useState<number>(0);
    const [date, setDate] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const commissionData: CommissionData = {
            cpf,
            value,
            date,
        };

        try {
            const response = await api.post('/commission/create', commissionData);
            navigate('/commissionList');
            console.log("Comissão criada:", response.data);
        } catch (error) {
            console.error("Erro ao criar a comissão:", error);
        }
    };

    const isFormValid = cpf && value && date;

    return (
        <div className="flex flex-col px-4 py-8 gap-2">
            <div className="flex flex-col gap-1">
                <label htmlFor="cpf">CPF do Afiliado</label>
                <InputText
                    id="cpf"
                    value={cpf}
                    onChange={(e) => setCPF(e.target.value)}
                    className="border-2 h-8 px-2"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="value">Valor</label>
                <InputText
                    id="value"
                    type="number"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    className="border-2 h-8 px-2"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="date">Data</label>
                <InputText
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border-2 h-8 px-2"
                />
            </div>

            <Button
                label="Criar Comissão"
                onClick={handleSubmit}
                className={`p-button font-bold h-8 text-white transition-transform shadow-lg mt-4 
                            ${isFormValid ? "bg-[#0891b2] hover:bg-[#067a93] cursor-pointer" : "bg-gray-400 cursor-not-allowed"}`}
                disabled={!isFormValid}
            />
        </div>
    );
}
