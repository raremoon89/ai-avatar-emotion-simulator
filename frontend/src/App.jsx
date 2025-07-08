import AvatarViewer from './components/AvatarViewer';
import EmotionForm from './components/EmotionForm';

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column', // 세로로!
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh',
        background: '#222',
        paddingTop: 40,
      }}
    >
      {/* 3D 아바타 */}
      <div
        style={{
          width: '380px',
          height: '500px',
          background: '#1a1a1a',
          borderRadius: '18px',
          boxShadow: '0 4px 32px #0006',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 36,
        }}
      >
        <AvatarViewer />
      </div>
      {/* 채팅/입력 폼 */}
      <div
        style={{
          width: '420px',
          background: '#23232a',
          borderRadius: '18px',
          boxShadow: '0 2px 18px #0008',
          padding: 28,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <EmotionForm />
      </div>
    </div>
  );
}

export default App;
