/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Projeto } from '../../../../types/types';
import { ReuniaoService } from '../../../../service/ReuniaoService';
import moment from 'moment';

const Reuniao = () => {
    let reuniaoVazio: Projeto.Reuniao = {
        id: 0,
        data: '',
        descricao: ''
    };

    const [reunioes, setReunioes] = useState<Projeto.Reuniao[] | null>(null);
    const [reuniaoDialog, setReuniaoDialog] = useState(false);
    const [deleteReuniaoDialog, setDeleteReuniaoDialog] = useState(false);
    const [deleteReunioesDialog, setDeleteReunioesDialog] = useState(false);
    const [reuniao, setReuniao] = useState<Projeto.Reuniao>(reuniaoVazio);
    const [selectedReunioes, setSelectedReunioes] = useState<Projeto.Reuniao[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const reuniaoService = useMemo(() => new ReuniaoService(), []);

    useEffect(() => {
        if (!reunioes) {
            reuniaoService.listarTodos()
                .then((response) => {
                    console.log(response.data);
                    setReunioes(response.data);
                }).catch((error) => {
                    console.log(error);
                })
        }
    }, [reuniaoService, reunioes]);

    const openNew = () => {
        setReuniao(reuniaoVazio);
        setSubmitted(false);
        setReuniaoDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setReuniaoDialog(false);
    };

    const hideDeleteReuniaoDialog = () => {
        setDeleteReuniaoDialog(false);
    };

    const hideDeleteReunioesDialog = () => {
        setDeleteReunioesDialog(false);
    };

    const saveReuniao = () => {
        setSubmitted(true);

        if (!reuniao.id) {
            reuniaoService.inserir(reuniao)
                .then((response) => {
                    setReuniaoDialog(false);
                    setReuniao(reuniaoVazio);
                    setReunioes(null);
                    toast.current?.show({
                        severity: 'info',
                        summary: 'Sucesso!',
                        detail: 'Reunião marcada com sucesso!'
                    });
                }).catch((error) => {
                    toast.current?.show({
                        severity: 'error',
                        summary: 'Erro!',
                        detail: 'Erro ao salvar!' 
                    })
                });
        } else {
            reuniaoService.alterar(reuniao)
                .then((response) => {
                    setReuniaoDialog(false);
                    setReuniao(reuniaoVazio);
                    setReunioes(null);
                    toast.current?.show({
                        severity: 'info',
                        summary: 'Sucesso!',
                        detail: 'Reunião alterada com sucesso!'
                    });
                }).catch((error) => {
                    toast.current?.show({
                        severity: 'error',
                        summary: 'Erro!',
                        detail: 'Erro ao alterar!' 
                    })
                })
        }
    }

    const editReuniao = (reuniao: Projeto.Reuniao) => {
        setReuniao({ ...reuniao });
        setReuniaoDialog(true);
    };

    const confirmDeleteReuniao = (reuniao: Projeto.Reuniao) => {
        setReuniao(reuniao);
        setDeleteReuniaoDialog(true);
    };

    const deleteReuniao = () => {
        if (reuniao.id) {
            reuniaoService.excluir(reuniao.id).then((response) => {
                setReuniao(reuniaoVazio);
                setDeleteReuniaoDialog(false);
                setReunioes(null);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Sucesso!',
                    detail: 'Reunião Deletada com Sucesso!',
                    life: 3000
                });
            }).catch((error) => {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Erro!',
                    detail: 'Erro ao deletar a Reunião!',
                    life: 3000
                });
            });
        }
    };

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteReunioesDialog(true);
    };

    const deleteSelectedReunioes = () => {

        Promise.all(selectedReunioes.map(async (_reuniao) => {
            if (_reuniao.id) {
                await reuniaoService.excluir(_reuniao.id);
            }
        })).then((response) => {
            setReunioes(null);
            setSelectedReunioes([]);
            setDeleteReunioesDialog(false);
            toast.current?.show({
                severity: 'success',
                summary: 'Sucesso!',
                detail: 'Reuniões Deletadas com Sucesso!',
                life: 3000
            });
        }).catch((error) => {
            toast.current?.show({
                severity: 'error',
                summary: 'Erro!',
                detail: 'Erro ao deletar reuniões!',
                life: 3000
            })
        });
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        

        //JEITO CERTO
        setReuniao(prevReuniao => ({
             ...prevReuniao,
             [name]: val,
        }));
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Novo" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    <Button label="Excluir" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedReunioes || !(selectedReunioes as any).length} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import" className="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} />
            </React.Fragment>
        );
    };

    const idBodyTemplate = (rowData: Projeto.Reuniao) => {
        return (
            <>
                <span className="p-column-title">Código</span>
                {rowData.id}
            </>
        );
    };

    const descricaoBodyTemplate = (rowData: Projeto.Reuniao) => {
        return (
            <>
                <span className="p-column-title">Descrição</span>
                {rowData.descricao}
            </>
        );
    };

    const dateBodyTemplate = (rowData: Projeto.Reuniao) => {
        const dataFormatada = moment(rowData.dataReuniao).format('DD/MM/YYYY HH:mm');
    
        return (
            <>
                <span className="p-column-title">Data da Reunião</span>
                {dataFormatada}
            </>
        );
    };
    
    const actionBodyTemplate = (rowData: Projeto.Reuniao) => {
        return (
            <>
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteReuniao(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gerenciamento da Reunião</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const reuniaoDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" text onClick={saveReuniao} />
        </>
    );
    const deleteReuniaoDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={hideDeleteReuniaoDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={deleteReuniao} />
        </>
    );
    const deleteReunioesDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={hideDeleteReunioesDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={deleteSelectedReunioes} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={reunioes}
                        selection={selectedReunioes}
                        onSelectionChange={(e) => setSelectedReunioes(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} até {last} de {totalRecords} Reuniões"
                        globalFilter={globalFilter}
                        emptyMessage="Nenhuma reunião encontrado."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="id" header="Código" sortable body={idBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="descricao" header="Descrição" sortable body={descricaoBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="date" header="Data" sortable body={dateBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={reuniaoDialog} style={{ width: '450px' }} header="Detalhes da Reunião" modal className="p-fluid" footer={reuniaoDialogFooter} onHide={hideDialog}>

                        <div className="field">
                            <label htmlFor="descricao">Descrição</label>
                            <InputText
                                id="descricao"
                                value={reuniao.descricao}
                                onChange={(e) => onInputChange(e, 'descricao')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !reuniao.descricao
                                })}
                            />
                            {submitted && !reuniao.descricao && <small className="p-invalid">Descrição é obrigatório.</small>}
                        </div>

                        <div className="field">
                            <label htmlFor="data">Data</label>
                            <InputText
                                id="data"
                                value={reuniao.data}
                                onChange={(e) => onInputChange(e, 'data')}
                                required
                                autoFocus
                                type='datetime-local'
                                className={classNames({
                                    'p-invalid': submitted && !reuniao.data
                                })}
                            />
                            {submitted && !reuniao.data && <small className="p-invalid">Data é obrigatória.</small>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteReuniaoDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteReuniaoDialogFooter} onHide={hideDeleteReuniaoDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {reuniao && (
                                <span>
                                    Você realmente deseja excluir a reunião marcada <b>{reuniao.data}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteReunioesDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteReunioesDialogFooter} onHide={hideDeleteReunioesDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {reuniao && <span>Você realmente deseja excluir as reuniões selecionadas?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Reuniao;
