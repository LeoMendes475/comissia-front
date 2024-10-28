import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import api from "../../service";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import { Toast } from 'primereact/toast';

export default function AffiliatesList() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/affiliates/findAll');
                setProducts(response.data);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        };
    
        fetchUsers();
    }, []);

    const editAffiliates = (affiliatesId: string) => {
        navigate(`/affiliates/edit/${affiliatesId}`);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return format(date, 'dd/MM/yyyy HH:mm:ss');
    };

    const deactivateAffiliate = async (userId: string) => {
        try {
            await api.put(`/affiliates/deactivate/${userId}`);
            if (toast.current) { 
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Afiliado inativado com sucesso!' });
            }
            
            const response = await api.get('/affiliates/findAll');
            setProducts(response.data);
        } catch (error) {
            if (toast.current) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Erro inativar o Afiliado!' });
            }

            console.log("Error: ", error);
        }
    };

    return (
        <div className='mx-8 my-6'>
            <a href="/affiliatescreate" rel="noopener noreferrer" className="p-button font-bold h-10 text-white">
                Cadastrar Afiliado
            </a>

            <div className="card">
                <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="id" header="ID"></Column>
                    <Column field="name" header="Nome"></Column>
                    <Column field="cpf" header="CPF"></Column>
                    <Column field="birthDate" header="Data de Nascimento"></Column>
                    <Column field="email" header="E-mail"></Column>
                    <Column field="phone" header="Telefone"></Column>
                    <Column field="active" header="Ativo" body={(rowData) => rowData.active === 1 ? 'Ativo' : 'Inativo'}></Column>
                    <Column field="created_at" header="Criado em" body={(rowData) => formatDate(rowData.created_at)}></Column>
                    <Column header="Ações" body={(rowData) => (
                        <div className="flex gap-2">
                            <Button 
                                label="Editar" 
                                onClick={() => editAffiliates(rowData.id)} 
                                className="p-button-warning" 
                            />
                            <Button 
                                label="Desativar" 
                                onClick={() => deactivateAffiliate(rowData.id)} 
                                className="p-button-danger" 
                            />
                        </div>
                    )}></Column>
                </DataTable>

                <Toast ref={toast} />
            </div>
        </div>
    );
}
