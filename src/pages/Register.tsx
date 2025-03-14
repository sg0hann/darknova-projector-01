
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useLanguage } from "@/hooks/useLanguage";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Register = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Store user in localStorage (just for mockup purposes)
      localStorage.setItem("user", JSON.stringify({ name: values.name, email: values.email }));
      
      toast({
        title: language === 'en' ? "Registration successful" : "Registro exitoso",
        description: language === 'en' 
          ? "Your account has been created" 
          : "Tu cuenta ha sido creada",
      });
      
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute w-64 h-64 rounded-full bg-primary/20 blur-3xl"
          animate={{ 
            x: ['-20%', '30%', '-20%'],
            y: ['10%', '60%', '10%'],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute w-72 h-72 rounded-full bg-accent/20 blur-3xl"
          animate={{ 
            x: ['110%', '60%', '110%'],
            y: ['60%', '0%', '60%'],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
      </div>
      
      {/* Grid overlay for futuristic effect */}
      <div className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-secondary/30 backdrop-blur-md border border-border/30 p-8 rounded-xl w-full max-w-md relative z-10 shadow-glow"
      >
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl font-bold text-gradient-primary mb-2">Execute</h1>
          <p className="text-muted-foreground">
            {language === 'en' ? 'Create your account' : 'Crea tu cuenta'}
          </p>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === 'en' ? 'Name' : 'Nombre'}</FormLabel>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <FormControl>
                      <Input 
                        className="pl-10" 
                        placeholder={language === 'en' ? 'Enter your name' : 'Ingresa tu nombre'} 
                        {...field} 
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === 'en' ? 'Email' : 'Correo'}</FormLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <FormControl>
                      <Input 
                        className="pl-10" 
                        placeholder={language === 'en' ? 'Enter your email' : 'Ingresa tu correo'} 
                        {...field} 
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === 'en' ? 'Password' : 'Contraseña'}</FormLabel>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <FormControl>
                      <Input 
                        className="pl-10 pr-10" 
                        type={showPassword ? "text" : "password"} 
                        placeholder={language === 'en' ? 'Create a password' : 'Crea una contraseña'} 
                        {...field} 
                      />
                    </FormControl>
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-muted-foreground"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{language === 'en' ? 'Confirm Password' : 'Confirmar Contraseña'}</FormLabel>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <FormControl>
                      <Input 
                        className="pl-10 pr-10" 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder={language === 'en' ? 'Confirm your password' : 'Confirma tu contraseña'} 
                        {...field} 
                      />
                    </FormControl>
                    <button 
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-2.5 text-muted-foreground"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mr-2 border-2 border-current border-t-transparent h-4 w-4 rounded-full inline-block"
                    />
                    {language === 'en' ? 'Creating Account...' : 'Creando Cuenta...'}
                  </span>
                ) : (
                  language === 'en' ? 'Create Account' : 'Crear Cuenta'
                )}
              </Button>
            </motion.div>
          </form>
        </Form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            {language === 'en' ? "Already have an account?" : "¿Ya tienes una cuenta?"} 
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="ml-1 text-primary hover:underline"
            >
              {language === 'en' ? 'Sign In' : 'Iniciar Sesión'}
            </motion.button>
          </p>
          
          <div className="mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              &larr; {language === 'en' ? 'Back to Home' : 'Volver al Inicio'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
