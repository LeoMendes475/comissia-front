import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import api from "../../service";
import { Button } from 'primereact/button';
import { format } from 'date-fns';
import { Toast } from 'primereact/toast';

export default function CommisionList() {
    const [products, setProducts] = useState([]);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/commission/findAll');
                setProducts(response.data);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        };
    
        fetchUsers();
    }, []);

    const deleteCommission = async (commissionId: string) => {
        try {
            await api.delete(`/commission/delete/${commissionId}`);
            if (toast.current) {
                toast.current?.show({ severity: 'info', summary: 'Info', detail: 'Comissão deletada com sucesso' });
            }

            const response = await api.get('/commission/findAll');
            setProducts(response.data);
        } catch (error) {
            if (toast.current) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Erro ao deletar comissão' });
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
            <a href="/commissioncreate" rel="noopener noreferrer" className="p-button font-bold h-10 text-white">
                Cadastrar Comissão
            </a>

            <div className="card">
                <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="id" header="ID"></Column>
                    <Column field="cpf" header="CPF"></Column>
                    <Column field="value" header="Valor"></Column>
                    <Column field="date" header="Criado em" body={(rowData) => formatDate(rowData.date)}></Column>
                    <Column header="Ações" body={(rowData) => (
                        <Button 
                            label="Excluir" 
                            onClick={() => deleteCommission(rowData.id)} 
                            className="p-button-warning" 
                        />
                    )}></Column>
                </DataTable>
            </div>

            <Toast ref={toast} />
        </div>
    );
}
