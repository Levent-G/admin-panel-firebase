import React, { useEffect, useRef, useState } from "react";
import CustomPaper from "../../components/CustomPaper";
import Form from "../../components/Form";
import { bolumEkleSchema } from "./shared/BolumEkleFormSchema";
import { bolumSorgula } from "../../api/services/bolumServices/bolumSorgula";
import { bolumleriGetirService } from "../../api/services/bolumServices/bolumleriGetiService";
import AutocompleteItem from "../../components/AutoCompleteItem";

const BolumIcerikSorgula = () => {
    const formRef = useRef(null);
    const pageToken = localStorage.getItem("pageToken");
    const [bolumlerList, setBolumlerList] = useState([]);

    const handleBolumSorgula = (data) => {
        bolumSorgula(pageToken, data.bolumAdi);
    };

    const customReset = () => {
        formRef.current?.methods?.reset();
    };

    useEffect(() => {
        bolumleriGetirService(pageToken, setBolumlerList);
    }, [pageToken]);

    return (
        <CustomPaper title="Bölüm İçerik Sorgula">
            <Form
                onSubmit={handleBolumSorgula}
                onReset={customReset}
                ref={formRef}
                schema={bolumEkleSchema}
                submitButtonText="Sorgula"
            >
                <AutocompleteItem
                    id="bolumAdi"
                    name="bolumAdi"
                    key="bolumAdi"
                    items={bolumlerList}
                    labeltext="Bölüm Adı"
                    lg={4}
                    md={6}
                    xs={12}
                />
            </Form>
        </CustomPaper>
    );
};

export default BolumIcerikSorgula;
