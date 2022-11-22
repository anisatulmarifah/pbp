import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { useState } from "react";
import supabase from "../supabase/supabaseClient";
import "./Form.css";

const Form: React.FC = () => {

  const [present] = useIonToast();

  const [kodeRuangan, setKodeRuangan] = useState<string | null>();
  const [kodeRuanganValid, setKodeRuanganValid] = useState(true);

  const [kapasitas, setKapasitas] = useState<number | null>();
  const [kapasitasValid, setKapasitasValid] = useState(true);

  const [keterangan, setKeterangan] = useState<string | null>();
  const [keteranganValid, setKeteranganValid] = useState(true);

  const onSubmit = () => {
    if (kodeRuangan === null) {
      setKodeRuanganValid(false);
    } else {
      setKodeRuanganValid(true);
    }

    if (kapasitas === null) {
      setKapasitasValid(false);
    } else {
      setKapasitasValid(true);
    }

    if (keterangan === null) {
      setKeteranganValid(false);
    } else {
      setKeteranganValid(true);
    }

    if (kodeRuanganValid && kapasitasValid && keteranganValid) {
      supabase
        .from("ruangan")
        .insert([
          {
            kode: kodeRuangan,
            kapasitas: kapasitas,
            keterangan: keterangan,
          },
        ])
        .then(() => {
          present("Data berhasil disimpan", 1500);
        });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Form Input Data</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          <IonItem className={`${!kodeRuanganValid && "ion-invalid"}`}>
            <IonLabel position="stacked">Kode Ruangan</IonLabel>
            <IonInput
              onIonChange={(e) => setKodeRuangan(e.detail.value!)}
              placeholder="A203"
            ></IonInput>
            <IonNote slot="error">Wajib Diisi</IonNote>
          </IonItem>
          <IonItem className={`${!kapasitasValid && "ion-invalid"}`}>
            <IonLabel position="stacked">Kapasitas</IonLabel>
            <IonInput
              onIonChange={(e) => setKapasitas(parseInt(e.detail.value!))}
              placeholder="99"
            ></IonInput>
            <IonNote slot="error">Wajib Diisi</IonNote>
          </IonItem>
          <IonItem className={`${!keteranganValid && "ion-invalid"}`}>
            <IonLabel position="stacked">Keterangan</IonLabel>
            <IonInput
              onIonChange={(e) => setKeterangan(e.detail.value!)}
              placeholder="Ruang Kelas/Ruang Pertemuan/Kantor"
            ></IonInput>
            <IonNote slot="error">Wajib Diisi</IonNote>
          </IonItem>
        </IonList>
        <IonButton style={{ width: "100%" }} onClick={onSubmit}>
          Submit
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Form;
