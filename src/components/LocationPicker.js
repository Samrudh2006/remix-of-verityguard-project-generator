import React, { useState } from 'react';
import { useLocation } from '../contexts/LocationContext';
import { useI18n } from '../i18n';
import { indianStates, citiesByState } from '../data/locations';

export default function LocationPicker({ onClose }) {
  const { location, setLocation, requestLocation, isLoading, error } = useLocation();
  const { t, lang } = useI18n();
  const [selectedState, setSelectedState] = useState(location?.state || '');
  const [selectedCity, setSelectedCity] = useState(location?.city || '');
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(false);

  const handleAutoDetect = () => {
    setShowPermissionPrompt(true);
  };

  const handleAllowLocation = () => {
    setShowPermissionPrompt(false);
    requestLocation();
  };

  const handleManualSelection = () => {
    if (!selectedState) {
      alert(t('location.selectState'));
      return;
    }
    const stateObj = indianStates.find((s) => s.code === selectedState);
    setLocation({
      state: selectedState,
      city: selectedCity || null,
      country: 'India',
      method: 'manual',
      stateName: lang === 'hi' ? stateObj?.nameHi : stateObj?.name,
    });
    onClose();
  };

  const cities = selectedState ? citiesByState[selectedState] || [] : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative glass-card max-w-lg w-full p-6 rounded-2xl border border-primary/30">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-white text-xl"
          aria-label="Close"
        >
          ✖
        </button>

        <h3 className="text-2xl font-bold text-white mb-2">{t('location.title')}</h3>
        <p className="text-white/70 text-sm mb-6">{t('location.description')}</p>

        {/* Current Location Display */}
        {location && (
          <div className="mb-4 p-3 bg-primary/10 border border-primary/30 rounded-lg">
            <div className="text-sm text-white/80">{t('location.current')}</div>
            <div className="text-white font-semibold">
              📍 {location.city && `${location.city}, `}
              {location.stateName || location.state}
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Permission Prompt Modal */}
        {showPermissionPrompt && (
          <div className="mb-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="text-white font-semibold mb-2">🔒 {t('location.permissionTitle')}</div>
            <p className="text-white/80 text-sm mb-3">{t('location.permissionText')}</p>
            <div className="flex gap-3">
              <button
                onClick={handleAllowLocation}
                className="flex-1 neon-button py-2 text-sm"
                disabled={isLoading}
              >
                {isLoading ? t('location.detecting') : t('location.allow')}
              </button>
              <button
                onClick={() => setShowPermissionPrompt(false)}
                className="flex-1 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition text-sm"
              >
                {t('location.deny')}
              </button>
            </div>
          </div>
        )}

        {/* Auto-detect Button */}
        {!showPermissionPrompt && (
          <button
            onClick={handleAutoDetect}
            disabled={isLoading}
            className="w-full mb-4 px-4 py-3 bg-gradient-to-r from-primary to-cyan-400 text-dark font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all disabled:opacity-60"
          >
            {isLoading ? '⏳ ' + t('location.detecting') : '📍 ' + t('location.autoDetect')}
          </button>
        )}

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-dark-light text-white/60">{t('location.or')}</span>
          </div>
        </div>

        {/* Manual Selection */}
        <div className="space-y-3">
          <div>
            <label className="block text-white/80 text-sm mb-2">{t('location.selectState')}</label>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedCity('');
              }}
              className="w-full p-3 bg-dark/80 border border-primary/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/60"
            >
              <option value="">{t('location.chooseState')}</option>
              {indianStates.map((state) => (
                <option key={state.code} value={state.code}>
                  {lang === 'hi' ? state.nameHi : state.name}
                </option>
              ))}
            </select>
          </div>

          {selectedState && cities.length > 0 && (
            <div>
              <label className="block text-white/80 text-sm mb-2">
                {t('location.selectCity')} ({t('location.optional')})
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full p-3 bg-dark/80 border border-primary/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/60"
              >
                <option value="">{t('location.chooseCity')}</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={handleManualSelection}
            disabled={!selectedState}
            className="w-full px-4 py-3 bg-white/10 border border-primary/30 text-white font-semibold rounded-lg hover:bg-white/20 transition-all disabled:opacity-40"
          >
            {t('location.confirm')}
          </button>
        </div>
      </div>
    </div>
  );
}
