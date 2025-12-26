"use client";

import Link from "next/link";
import { Mail, Phone, Github, Linkedin } from "lucide-react";
import { Container } from "@/shared/ui";

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 border-t border-gray-800 mt-auto">
      <Container className="px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-lg font-bold">Vadym</h3>
            <div className="flex flex-col gap-2 text-gray-400 text-sm items-center md:items-start">
              <a
                href="tel:+79990000000"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Phone size={16} />
                <span>+49 (175) 000-00-00</span>
              </a>
              <a
                href="mailto:email@example.com"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Mail size={16} />
                <span>minerking112256@gmail.com</span>
              </a>

              <div className="flex gap-4 mt-2">
                <Link
                  href="https://github.com/saijaku0"
                  target="_blank"
                  className="hover:text-blue-500 transition"
                >
                  <Github size={20} />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/vadym-melezhyk-978b71266/"
                  target="_blank"
                  className="hover:text-blue-500 transition"
                >
                  <Linkedin size={20} />
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-4xl font-black text-gray-800 select-none">
              2025
            </p>
            <p className="text-xs text-gray-500 mt-1">Developed by Vadym</p>
          </div>

          <div className="text-center md:text-right">
            <h3 className="text-lg font-bold mb-4 text-white">О проекте</h3>

            <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto md:ml-auto md:mx-0 mb-4">
              Fullstack интернет-магазин кроссовок. Полный цикл покупки от
              добавления в корзину до оформления заказа.
            </p>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                  Frontend
                </p>
                <p className="text-gray-300">
                  Next.js 14 <span className="text-gray-600 mx-1">•</span> Redux
                  Toolkit <span className="text-gray-600 mx-1">•</span> TS{" "}
                  <span className="text-gray-600 mx-1">•</span> Tailwind
                </p>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                  Backend
                </p>
                <p className="text-gray-300">
                  ASP.NET Core (C#){" "}
                  <span className="text-gray-600 mx-1">•</span> PostgreSQL{" "}
                  <span className="text-gray-600 mx-1">•</span> Docker
                </p>
              </div>
            </div>

            <div className="mt-5">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-blue-400 border border-gray-700">
                Feature-Sliced Design (FSD)
              </span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
