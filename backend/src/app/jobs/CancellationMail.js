import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  /**
   * Método acessível por qualquer arquivo que importe essa classe devido ao get.
   * Esse método retorna uma chave única, que teremos para cada job.
   */
  get key() {
    return 'CancellationMail';
  }

  // Tarefa executada quando o processo for executado.
  async handle({ data }) {
    const { appointment } = data;

    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento Cancelado',
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "dd 'de' MMMM', às' H:mm'h.'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancellationMail();
