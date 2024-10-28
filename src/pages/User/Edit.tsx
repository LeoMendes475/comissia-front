import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import api from "../../service";
import { useParams, useNavigate } from "react-router-dom";

export function UserEdit() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get(`/user/findById/${id}`);
                const userData = response.data;

                setEmail(userData.email);
                setName(userData.name);
                setPassword("");
            } catch (error) {
                console.error("Erro ao buscar o usuário:", error);
            }
        };

        fetchUserData();
    }, [id]);

    const handleSubmit = async () => {
        const userData = {
            email,
            password,
            name,
        };

        try {
            const response = await api.patch(`/user/update/${id}`, userData);
            console.log("Usuário atualizado:", response.data);
            navigate('/userlist');
        } catch (error) {
            console.error("Erro ao atualizar o usuário:", error);
        }
    };

    const isFormValid = email && name;

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
                    type="password"
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
                label="Atualizar Usuário"
                onClick={handleSubmit}
                className={`p-button font-bold h-8 text-white transition-transform shadow-lg mt-4 
                            ${isFormValid ? "bg-[#0891b2] hover:bg-[#067a93] cursor-pointer" : "bg-gray-400 cursor-not-allowed"}`}
                disabled={!isFormValid}
            />
        </div>
    );
}
