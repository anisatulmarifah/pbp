import {
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router";

const Index = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Kelompok 6</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton
          style={{
            display: "block",
            margin: "auto",
            marginTop: "100px",
            width: "50vw",
          }}
          onClick={() => history.push("/form")}
        >
          Tambah Ruangan
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Index;
