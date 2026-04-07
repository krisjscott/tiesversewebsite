import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './AnnouncementBanner.css';

const AnnouncementBanner = () => {
    const [featuredEvent, setFeaturedEvent] = useState(null);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .eq('is_featured', true)
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            if (data) setFeaturedEvent(data);
        };
        fetchFeatured();
    }, []);

    if (!featuredEvent || !visible) return null;

    return (
        <div className="announcement-banner-wrapper global-notice-bar fade-in">
            <div className="banner-content">
                <div className="banner-left">
                    <span className="banner-tag">NEW ANNOUNCEMENT</span>
                    <p className="banner-text">
                        <strong>{featuredEvent.title}</strong> — {featuredEvent.date} at {featuredEvent.time}
                    </p>
                </div>
                <div className="banner-right">
                    <a href={featuredEvent.form_link} target="_blank" rel="noopener noreferrer" className="banner-cta">
                        REGISTER NOW ↗
                    </a>
                    <button className="banner-close" onClick={() => setVisible(false)}>✕</button>
                </div>
            </div>
            <div className="banner-progress"></div>
        </div>
    );
};

export default AnnouncementBanner;
