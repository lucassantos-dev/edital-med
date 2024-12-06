import { Facebook, Instagram } from "lucide-react";


export default function Footer() {
  return (
    <footer className="bg-slate-50 py-2 text-stone-700 text-center shadow-2xl">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-4">
          <h3 className="text-sm ">Siga-nos nas redes sociais</h3>
        </div>
        <div className="flex justify-center space-x-6">
          <a
            href="https://instagram.com/medlarsaude"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-700 hover:text-[#67a892] transition duration-300"
          >
            <Instagram  size={20} />
          </a>
          <a
            href="https://facebook.com/medlarsaude"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-700 hover:text-[#67a892] transition duration-300"
          >
            <Facebook size={20} />
          </a>
          {/* <a
            href="https://wa.me/5551999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-700 hover:text-[#67a892] transition duration-300"
          >
            <MessageCircle size={20} />
          </a> */}
        </div>
        <div className="mt-4 text-xs">
          <p>&copy; {new Date().getFullYear()} Medlar Saúde. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
