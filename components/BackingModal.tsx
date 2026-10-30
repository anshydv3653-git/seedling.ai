// components/BackingModal.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import {
  X,
  HeartHandshake,
  DollarSign,
  User,
  MessageSquare,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import {
  ProjectWithFunding,
  Donation,
  CreateOrderResponse,
  CaptureOrderResponse,
} from '@/types/seedling';

interface BackingModalProps {
  project: ProjectWithFunding | null;
  onClose: () => void;
  onDonationSuccess: (projectId: string, donation: Donation) => void;
}

const PRESET_AMOUNTS = [10, 25, 50, 100];

export function BackingModal({
  project,
  onClose,
  onDonationSuccess,
}: BackingModalProps) {
  const [amount, setAmount] = useState<number>(25);
  const [backerName, setBackerName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [completedDonation, setCompletedDonation] = useState<Donation | null>(
    null
  );

  // Refs ensure PayPal callbacks always read the latest input values
  const amountRef = useRef<number>(amount);
  const backerNameRef = useRef<string>(backerName);
  const messageRef = useRef<string>(message);

  useEffect(() => {
    amountRef.current = amount;
  }, [amount]);

  useEffect(() => {
    backerNameRef.current = backerName;
  }, [backerName]);

  useEffect(() => {
    messageRef.current = message;
  }, [message]);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!project) {
      setAmount(25);
      setBackerName('');
      setMessage('');
      setErrorMsg(null);
      setIsProcessing(false);
      setCompletedDonation(null);
    }
  }, [project]);

  // Close on Escape key when not actively processing payment
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isProcessing) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, isProcessing, onClose]);

  if (!project) return null;

  const validAmount = Number(amount) > 0 ? Number(amount) : 0;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="backing-modal-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !isProcessing && onClose()}
          className="fixed inset-0 bg-[#03070E]/85 backdrop-blur-md"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-lg rounded-3xl border border-cyan-400/25 bg-[#071426]/95 backdrop-blur-2xl shadow-2xl shadow-cyan-950/60 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-5 bg-[#050E1C]/80">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/30 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 text-emerald-300">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h2
                  id="backing-modal-title"
                  className="text-lg font-bold text-white tracking-tight truncate"
                >
                  {completedDonation
                    ? 'Micro-Grant Confirmed!'
                    : `Back ${project.title}`}
                </h2>
                <p className="text-xs text-slate-400 truncate">
                  Builder: {project.builder_name}
                </p>
              </div>
            </div>

            {!isProcessing && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors shrink-0 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-5">
            {completedDonation ? (
              /* Post-Capture Confirmation State */
              <div className="text-center space-y-5 py-2">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/40 bg-emerald-500/20 text-emerald-300 shadow-lg shadow-emerald-950/50">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-semibold text-emerald-300 mb-2">
                    <Sparkles className="h-3 w-3" />
                    PayPal Order Captured
                  </span>
                  <h3 className="text-2xl font-extrabold text-white">
                    ${Number(completedDonation.amount).toLocaleString()} Micro-Grant Sent
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                    Thank you,{' '}
                    <span className="text-white font-semibold">
                      {completedDonation.backer_name}
                    </span>
                    ! Your contribution has been verified and recorded for{' '}
                    <span className="text-cyan-300 font-semibold">
                      {project.title}
                    </span>
                    .
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#050E1C]/80 p-4 text-left text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">PayPal Order ID:</span>
                    <span className="font-mono text-cyan-300">
                      {completedDonation.paypal_order_id}
                    </span>
                  </div>
                  {completedDonation.message && (
                    <div className="pt-2 border-t border-white/5">
                      <span className="text-slate-400 block mb-0.5">
                        Your Note:
                      </span>
                      <p className="text-slate-200 italic">
                        &ldquo;{completedDonation.message}&rdquo;
                      </p>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 py-3 text-xs sm:text-sm font-bold text-slate-950 shadow-lg hover:brightness-110 transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              /* Backing Configuration & PayPal Buttons */
              <>
                {errorMsg && (
                  <div className="rounded-xl border border-rose-500/40 bg-rose-950/40 p-3.5 text-xs text-rose-200 flex items-start gap-2.5">
                    <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Preset Amount Selector */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Select Micro-Grant Amount (USD)
                  </label>
                  <div className="grid grid-cols-4 gap-2.5 mb-3">
                    {PRESET_AMOUNTS.map((preset) => {
                      const isSelected = Number(amount) === preset;
                      return (
                        <button
                          key={preset}
                          type="button"
                          disabled={isProcessing}
                          onClick={() => {
                            setAmount(preset);
                            setErrorMsg(null);
                          }}
                          className={`rounded-xl border py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'border-cyan-400 bg-cyan-500/20 text-white shadow-md shadow-cyan-950/50'
                              : 'border-white/10 bg-[#040B16] text-slate-300 hover:border-cyan-400/30 hover:text-white'
                          }`}
                        >
                          ${preset}
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Amount Input */}
                  <div className="relative">
                    <DollarSign className="h-4 w-4 text-cyan-400 absolute left-3.5 top-3" />
                    <input
                      type="number"
                      min={1}
                      max={10000}
                      disabled={isProcessing}
                      value={amount || ''}
                      onChange={(e) => {
                        setAmount(Number(e.target.value));
                        setErrorMsg(null);
                      }}
                      placeholder="Custom USD amount"
                      className="w-full rounded-xl border border-white/10 bg-[#040B16] pl-9 pr-4 py-2.5 text-sm font-semibold text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Backer Name & Optional Note */}
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-cyan-400" />
                      Your Name (Optional)
                    </label>
                    <input
                      type="text"
                      disabled={isProcessing}
                      value={backerName}
                      onChange={(e) => setBackerName(e.target.value)}
                      placeholder="Anonymous Founder"
                      className="w-full rounded-xl border border-white/10 bg-[#040B16] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                      <MessageSquare className="h-3.5 w-3.5 text-cyan-400" />
                      Encouragement Note for Builder (Optional)
                    </label>
                    <textarea
                      rows={2}
                      disabled={isProcessing}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Keep building! Excited to see your prototype grow."
                      className="w-full rounded-xl border border-white/10 bg-[#040B16] px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none resize-none"
                    />
                  </div>
                </div>

                {/* PayPal Sandbox Integration Box */}
                <div className="rounded-2xl border border-cyan-400/20 bg-[#040B16]/90 p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1.5 text-slate-300 font-medium">
                      <ShieldCheck className="h-4 w-4 text-emerald-400" />
                      PayPal Sandbox Checkout
                    </span>
                    <span className="font-bold text-cyan-300">
                      Total: ${validAmount.toLocaleString()} USD
                    </span>
                  </div>

                  {validAmount <= 0 ? (
                    <p className="text-xs text-amber-300 text-center py-3">
                      Please enter a valid micro-grant amount greater than $0.
                    </p>
                  ) : (
                    <div className="pt-1">
                      <PayPalScriptProvider
                        options={{
                          clientId:
                            process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'sb',
                          currency: 'USD',
                          intent: 'capture',
                        }}
                      >
                        <PayPalButtons
                          style={{
                            layout: 'vertical',
                            color: 'gold',
                            shape: 'rect',
                            label: 'paypal',
                            height: 42,
                          }}
                          disabled={isProcessing || validAmount <= 0}
                          forceReRender={[validAmount]}
                          createOrder={async () => {
                            setErrorMsg(null);
                            const currentAmount = Number(amountRef.current);

                            if (!currentAmount || currentAmount <= 0) {
                              setErrorMsg('Valid amount is required.');
                              throw new Error('Valid amount is required');
                            }

                            const res = await fetch(
                              '/api/payments/create-order',
                              {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ amount: currentAmount }),
                              }
                            );

                            const data: CreateOrderResponse = await res.json();

                            if (!res.ok || !data.id) {
                              const errText =
                                data.error ||
                                'Failed to initialize PayPal order.';
                              setErrorMsg(errText);
                              throw new Error(errText);
                            }

                            return data.id;
                          }}
                          onApprove={async (data) => {
                            setIsProcessing(true);
                            setErrorMsg(null);

                            try {
                              const res = await fetch(
                                '/api/payments/capture-order',
                                {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json',
                                  },
                                  body: JSON.stringify({
                                    orderId: data.orderID,
                                    projectId: project.id,
                                    backerName:
                                      backerNameRef.current.trim() ||
                                      'Anonymous Founder',
                                    amount: Number(amountRef.current),
                                    message: messageRef.current.trim() || '',
                                  }),
                                }
                              );

                              const result: CaptureOrderResponse =
                                await res.json();

                              if (
                                !res.ok ||
                                result.error ||
                                result.captureData?.status !== 'COMPLETED' ||
                                !result.donation
                              ) {
                                throw new Error(
                                  result.error ||
                                    'Payment capture was not completed.'
                                );
                              }

                              setCompletedDonation(result.donation);
                              onDonationSuccess(project.id, result.donation);
                            } catch (err: unknown) {
                              const msg =
                                err instanceof Error
                                  ? err.message
                                  : 'Failed to capture PayPal order.';
                              setErrorMsg(msg);
                            } finally {
                              setIsProcessing(false);
                            }
                          }}
                          onError={(err) => {
                            console.error('PayPal Checkout Error:', err);
                            setErrorMsg(
                              'PayPal checkout encountered an issue. Please verify your sandbox credentials or try again.'
                            );
                            setIsProcessing(false);
                          }}
                        />
                      </PayPalScriptProvider>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}