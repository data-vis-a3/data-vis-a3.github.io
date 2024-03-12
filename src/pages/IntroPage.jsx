import instructions from './intro-page.png'


export default function IntroPage() {

  return (
    <div>
      <h2 style={{ padding: "60px", paddingTop: "10px" }}>Thank you for participating in our experiment! The following graphic provides instructions for completing the assesment. Once you are ready, click on the "Participate" button!</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "60%", height: "60%" }}>
          <img src={instructions} alt="Instructions" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
      </div>
    </div>
  );

}

