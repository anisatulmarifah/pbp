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

  const [kode, setKode] = useState<string | null>(null);
  const [kodeValid, setKodeValid] = useState(true);

  const [kapasitas, setKapasitas] = useState<string | null>(null);
  const [kapasitasValid, setKapasitasValid] = useState(true);

  const [keterangan, setKeterangan] = useState<string | null>(null);
  const [keteranganValid, setKeteranganValid] = useState(true);

  const resetState = () => {
    setKode(null);
    setKapasitas(null);
    setKeterangan(null);
    setKodeValid(true);
    setKapasitasValid(true);
    setKeteranganValid(true);
  };

  const onSubmit = () => {
    if (kode === null) {
      setKodeValid(false);
    } else {
      setKodeValid(true);
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

    if (kodeValid && kapasitasValid && keteranganValid) {
      supabase
        .from("ruangan") // nama table
        .insert([
          // insert data
          {
            kode: kode,
            kapasitas: parseInt(kapasitas!), // mengubah string ke number, tanda ! memastikan data tidak null
            keterangan: keterangan,
          },
        ])
        .then((response) => {
          // apa responsenya
          if (response.error) {
            // jika response.error ada, beri pesan ke pengguna
            present({
              message: response.error.message,
              duration: 2000,
            });
          } else {
            // jika tidak ada, beri pesan ke pengguna bahwa data berhasil disimpan dan reset form
            present("Data berhasil disimpan", 1500);
            resetState();
          }
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
          {/* Class ion-invalid akan membuat text pada IonNote terlihat. Class ini hanya ditambahkan apabila kode tidak valid */}
          <IonItem className={`${!kodeValid && "ion-invalid"}`}>
            <IonLabel position="stacked">Kode Ruangan</IonLabel>
            <IonInput
              value={kode}
              onIonChange={(e) => setKode(e.detail.value!)}
              placeholder="A203"
            ></IonInput>
            <IonNote slot="error">Wajib Diisi</IonNote>
          </IonItem>
          <IonItem className={`${!kapasitasValid && "ion-invalid"}`}>
            <IonLabel position="stacked">Kapasitas</IonLabel>
            <IonInput
              value={kapasitas}
              type="number"
              onIonChange={(e) => setKapasitas(e.detail.value!)}
              placeholder="99"
            ></IonInput>
            <IonNote slot="error">Wajib Diisi</IonNote>
          </IonItem>
          <IonItem className={`${!keteranganValid && "ion-invalid"}`}>
            <IonLabel position="stacked">Keterangan</IonLabel>
            <IonInput
              value={keterangan}
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
