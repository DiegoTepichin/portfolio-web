import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';

// --- Variantes de animación ---
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3 },
  },
};

const successVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, type: 'spring', bounce: 0.4 },
  },
};

export default function Contact() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: 'onChange', // Validación en tiempo real
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data) => {
    setSubmitError(null);
    try {
      const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
      
      // Si no hay endpoint (modo desarrollo/local sin .env), usamos simulación para no romper la UX.
      if (!endpoint) {
        console.warn("VITE_FORMSPREE_ENDPOINT no está configurado en .env. Simulando envío...");
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setIsSuccess(true);
        reset();
        return;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        reset();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ocurrió un error al procesar el mensaje.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Hubo un problema al enviar tu mensaje. Inténtalo de nuevo o escribe a durontepichindiego@gmail.com.');
    }
  };

  return (
    <PageTransition>
    <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24 flex justify-center items-center">
      <div className="relative w-full max-w-lg">
        {/* Subtle background orb for the form */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(6,182,212,0.1) 0%, transparent 60%)',
            filter: 'blur(40px)',
          }}
          aria-hidden="true"
        />
        
        {/* Usamos AnimatePresence para alternar entre el formulario y el mensaje de éxito */}
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="contact-form"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative p-8 sm:p-10 rounded-3xl glass-md"
            >
              {/* Encabezado */}
              <div className="space-y-3 text-center mb-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  Contacto
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50">
                  Hablemos de tu{' '}
                  <span className="bg-gradient-to-r from-cyan-500 to-indigo-500 bg-clip-text text-transparent">
                    Proyecto
                  </span>
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  ¿Tienes alguna duda o propuesta? Escríbeme y te responderé a la brevedad.
                </p>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
                
                {/* Campo Nombre (Floating Label) */}
                <div className="relative z-0 w-full group">
                  <input
                    type="text"
                    id="name"
                    className={[
                      'peer block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 transition-colors',
                      errors.name 
                        ? 'border-red-500/60 text-red-400 focus:border-red-400' 
                        : 'border-white/20 text-zinc-100 focus:border-cyan-400'
                    ].join(' ')}
                    placeholder=" " // Requerido para que el peer-placeholder-shown funcione
                    {...register('name', {
                      required: 'El nombre es obligatorio.',
                      minLength: { value: 3, message: 'Mínimo 3 caracteres.' },
                    })}
                  />
                  <label
                    htmlFor="name"
                    className={[
                      'absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]',
                      'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0',
                      'peer-focus:scale-75 peer-focus:-translate-y-6',
                      errors.name 
                        ? 'text-red-400' 
                        : 'text-zinc-400 peer-focus:text-cyan-400'
                    ].join(' ')}
                  >
                    Nombre Completo
                  </label>
                  {errors.name && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -bottom-5 left-0 text-xs text-red-500">
                      {errors.name.message}
                    </motion.p>
                  )}
                </div>

                {/* Campo Email (Floating Label) */}
                <div className="relative z-0 w-full group mt-8">
                  <input
                    type="email"
                    id="email"
                    className={[
                      'peer block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 transition-colors',
                      errors.email 
                        ? 'border-red-500/60 text-red-400 focus:border-red-400' 
                        : 'border-white/20 text-zinc-100 focus:border-cyan-400'
                    ].join(' ')}
                    placeholder=" "
                    {...register('email', {
                      required: 'El correo es obligatorio.',
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Correo no válido.',
                      },
                    })}
                  />
                  <label
                    htmlFor="email"
                    className={[
                      'absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]',
                      'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0',
                      'peer-focus:scale-75 peer-focus:-translate-y-6',
                      errors.email 
                        ? 'text-red-400' 
                        : 'text-zinc-400 peer-focus:text-cyan-400'
                    ].join(' ')}
                  >
                    Correo Electrónico
                  </label>
                  {errors.email && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -bottom-5 left-0 text-xs text-red-500">
                      {errors.email.message}
                    </motion.p>
                  )}
                </div>

                {/* Campo Mensaje (Floating Label) */}
                <div className="relative z-0 w-full group mt-8">
                  <textarea
                    id="message"
                    rows="4"
                    className={[
                      'peer block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 resize-none transition-colors',
                      errors.message 
                        ? 'border-red-500/60 text-red-400 focus:border-red-400' 
                        : 'border-white/20 text-zinc-100 focus:border-cyan-400'
                    ].join(' ')}
                    placeholder=" "
                    {...register('message', {
                      required: 'El mensaje es obligatorio.',
                      minLength: { value: 10, message: 'Mínimo 10 caracteres.' },
                    })}
                  />
                  <label
                    htmlFor="message"
                    className={[
                      'absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]',
                      'peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0',
                      'peer-focus:scale-75 peer-focus:-translate-y-6',
                      errors.message 
                        ? 'text-red-400' 
                        : 'text-zinc-400 peer-focus:text-cyan-400'
                    ].join(' ')}
                  >
                    Mensaje
                  </label>
                  {errors.message && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -bottom-5 left-0 text-xs text-red-500">
                      {errors.message.message}
                    </motion.p>
                  )}
                </div>

                {/* Botón de Enviar */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className={[
                      'w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 text-center flex items-center justify-center gap-2',
                      (!isValid || isSubmitting)
                        ? 'bg-white/5 border border-white/10 text-zinc-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transform hover:-translate-y-0.5',
                    ].join(' ')}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      'Enviar Mensaje'
                    )}
                  </button>
                </div>
                {submitError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-500 text-center mt-3 font-medium"
                  >
                    ⚠️ {submitError}
                  </motion.p>
                )}
              </form>
            </motion.div>
          ) : (
            /* --- Mensaje de Éxito --- */
            <motion.div
              key="success-message"
              variants={successVariants}
              initial="hidden"
              animate="visible"
              className="p-10 rounded-3xl glass flex flex-col items-center justify-center text-center space-y-4 shadow-xl"
            >
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-2 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-emerald-400">
                ¡Mensaje Enviado!
              </h2>
              <p className="text-emerald-200/80 max-w-sm">
                Gracias por ponerte en contacto. Revisaré tu mensaje y te responderé lo más pronto posible.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-6 px-6 py-2.5 rounded-full text-sm font-semibold text-emerald-100 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 transition-colors"
              >
                Enviar otro mensaje
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
    </PageTransition>
  );
}
