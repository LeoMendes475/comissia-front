import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import api from "../../service";
import { states } from "../../data/states";
import { citiesByState } from "../../data/citiesByState";
import { useNavigate } from "react-router-dom";

interface AffiliateData {
    name: string;
    cpf: string;
    birthDate: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
}

export function AffiliatesCreate() {
    const [name, setName] = useState<string>("");
    const [cpf, setCPF] = useState<string>("");
    const [birthDate, setBirthDate] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [state, setState] = useState<string>("");
    const navigate = useNavigate();

    const handleStateChange = (selectedState: string) => {
        setState(selectedState);
        setCity("");
    };

    const handleSubmit = async () => {
        const userData: AffiliateData = {
            name,
            cpf,
            birthDate,
            email,
            phone,
            address,
            city,
            state,
        };

        try {
            const response = await api.post('/affiliates/create', userData);
            navigate('/affiliatesList');
            console.log("Afiliado criado:", response.data);
        } catch (error) {
            console.error("Erro ao criar o afiliado:", error);
        }
    };

    const isFormValid = name && cpf && birthDate && email && phone && address && city && state;

    return (
        <div className="flex flex-col px-4 py-8 gap-2">
            <div className="flex flex-col gap-1">
                <label htmlFor="name">Nome</label>
                <InputText
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-2 h-8 px-2"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="cpf">CPF</label>
                <InputText
                    id="cpf"
                    value={cpf}
                    onChange={(e) => setCPF(e.target.value)}
                    className="border-2 h-8 px-2"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="birthDate">Data de Nascimento</label>
                <InputText
                    id="birthDate"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="border-2 h-8 px-2"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="email">E-mail</label>
                <InputText
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-2 h-8 px-2"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="phone">Telefone</label>
                <InputText
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border-2 h-8 px-2"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="address">Endereço</label>
                <InputText
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border-2 h-8 px-2"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="state">Estado</label>
                <Dropdown
                    id="state"
                    value={state}
                    options={states}
                    onChange={(e) => handleStateChange(e.value)}
                    placeholder="Selecione um estado"
                    className="border-2"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="city">Cidade</label>
                <Dropdown
                    id="city"
                    value={city}
                    options={(citiesByState[state] || []).map(city => ({ label: city, value: city }))}
                    onChange={(e) => setCity(e.value)}
                    placeholder="Selecione uma cidade"
                    className="border-2"
                    disabled={!state}
                />
            </div>

            <Button
                label="Criar Afiliado"
                onClick={handleSubmit}
                className={`p-button font-bold h-8 text-white transition-transform shadow-lg mt-4 
                            ${isFormValid ? "bg-[#0891b2] hover:bg-[#067a93] cursor-pointer" : "bg-gray-400 cursor-not-allowed"}`}
                disabled={!isFormValid}
            />
        </div>
    );
}
