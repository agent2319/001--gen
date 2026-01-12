import React from 'react';
import { useStore } from '../store';

const BlockRenderer: React.FC<{ block: any }> = ({ block }) => {
    const data = block.localOverrides?.data || {};
    const layout = block.localOverrides?.layout || {};

    const containerStyle: React.CSSProperties = {
        padding: `20px ${layout.paddingX || 40}px`,
        maxWidth: '1200px',
        margin: '0 auto',
    };

    switch (block.type) {
        case 'B0101':
            return (
                <nav style={{ ...containerStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 80 }}>
                    <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>{data.header || 'Logo'}</span>
                </nav>
            );

        case 'B0201':
            return (
                <section style={{ ...containerStyle, textAlign: 'center', paddingTop: 100, paddingBottom: 100 }}>
                    <h1 style={{
                        fontSize: data.titleTypo?.fontSize ? `${data.titleTypo.fontSize}px` : '48px',
                        fontWeight: data.titleTypo?.fontWeight || 800,
                        textTransform: data.titleTypo?.uppercase ? 'uppercase' : 'none',
                        marginBottom: '1.5rem'
                    }}>
                        {data.title || 'Title'}
                    </h1>
                    <p style={{ fontSize: '20px', maxWidth: '700px', margin: '0 auto', opacity: 0.8 }}>
                        {data.description || ''}
                    </p>
                </section>
            );

        default:
            return data.title ? <section style={containerStyle}><h2>{data.title}</h2></section> : null;
    }
};

export const Viewer: React.FC = () => {
    const { contentBlocks, globalSettings } = useStore();
    const colors = globalSettings?.GL02?.params || [];
    const bgColor = colors.find((p: any) => p.id === 'P1')?.value || '#09090B';
    const textColor = colors.find((p: any) => p.id === 'P4')?.value || '#FFFFFF';

    return (
        <div style={{ minHeight: '100vh', backgroundColor: bgColor, color: textColor }}>
            {contentBlocks.map((block: any) => block.isVisible !== false && <BlockRenderer key={block.id} block={block} />)}
        </div>
    );
};
