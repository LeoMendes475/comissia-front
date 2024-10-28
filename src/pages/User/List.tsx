import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import api from "../../service";
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import { Toast } from 'primereact/toast';

export default function UserList() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/user/findAll');
                setProducts(response.data);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        };
    
        fetchUsers();
    }, []);

    const editUser = (userId: string) => {
        navigate(`/user/edit/${userId}`);
    };

    const deactivateUser = async (userId: string) => {
        try {
            await api.put(`/user/deactivate/${userId}`);

            if (toast.current) {
                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Usuario inativado com sucesso!' });
            }

            const response = await api.get('/user/findAll');
            setProducts(response.data);
        } catch (error) {
            if (toast.current) { 
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Erro inativar o usuario!' });
            }

            console.log("Error: ", error);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return format(date, 'dd/MM/yyyy HH:mm:ss');
    };

    return (
        <div className='mx-8 my-6'>
            <a href="/usercreate" rel="noopener noreferrer" className="p-button font-bold h-10 text-white">
                Cadastrar Usuario
            </a>

            <div className="card">
                <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="id" header="id"></Column>
                    <Column field="name" header="Nome"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="active" header="Ativo" body={(rowData) => rowData.active === 1 ? 'Ativo' : 'Inativo'}></Column>
                    <Column field="created_at" header="Criado em" body={(rowData) => formatDate(rowData.created_at)}></Column>
                    <Column header="Ações" body={(rowData) => (
                        <div className="flex gap-2">
                            <Button 
                                label="Editar" 
                                onClick={() => editUser(rowData.id)} 
                                className="p-button-warning" 
                            />
                            <Button 
                                label="Desativar" 
                                onClick={() => deactivateUser(rowData.id)} 
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