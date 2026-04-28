// Responsabilidade: apenas normalizar e validar formato de documento (ex.: CPF só dígitos).
export class ValidadorDocumentoCliente {
  normalizar(documento: string): string {
    return documento.replaceAll(/\D/g, "");
  }

  garantirCpf11Digitos(documentoNormalizado: string): void {
    if (documentoNormalizado.length !== 11) {
      throw new Error("Documento do cliente inválido (esperado 11 dígitos).");
    }
  }
}
