import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import api from "../../service";
import { useNavigate } from "react-router-dom";

export function UserCreate() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const userData = {
            email,
            password,
            name,
        };
        
        try {
            const response = await api.post('/user/create', userData);
            navigate('/userlist');
            console.log("Usuário criado:", response.data);
        } catch (error) {
            console.error("Erro ao criar o usuário:", error);
        }
    };

    const isFormValid = email && password && name;

    return (
        <div className="flex flex-col px-4 py-8">
            <div className="flex flex-col gap-1">
                <label htmlFor="email">E-mail</label>
                <InputText
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-describedby="email-help"
                    className="border-2"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="password">Senha</label>
                <InputText
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-describedby="password-help"
                    className="border-2"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="name">Nome</label>
                <InputText
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-describedby="name-help"
                    className="border-2"
                />
            </div>

            <Button
                label="Criar Usuário"
                onClick={handleSubmit}
                className={`p-button font-bold h-8 text-white transition-transform shadow-lg mt-4 
                            ${isFormValid ? "bg-[#0891b2] hover:bg-[#067a93] cursor-pointer" : "bg-gray-400 cursor-not-allowed"}`}
                disabled={!isFormValid}
            />
        </div>
    );
}
