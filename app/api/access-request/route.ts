import { NextRequest, NextResponse } from 'next/server'

/**
 * API endpoint для отправки заявки на полный доступ
 * Логирует данные для MagistrTheOne
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Валидация обязательных полей
    const requiredFields = ['name', 'email', 'experience', 'projectDescription']
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim().length === 0) {
        return NextResponse.json(
          {
            error: 'Неверные данные',
            message: `Поле ${field} обязательно для заполнения`
          },
          { status: 400 }
        )
      }
    }

    // Логируем заявку для MagistrTheOne
    console.log('🎯 НОВАЯ ЗАЯВКА НА ДОСТУП К NOCTURIDE')
    console.log('=====================================')
    console.log('👤 Имя:', formData.name)
    console.log('📧 Email:', formData.email)
    console.log('🏢 Компания:', formData.company || 'Не указано')
    console.log('💼 Роль:', formData.role || 'Не указано')
    console.log('⏰ Время:', new Date().toLocaleString('ru-RU'))
    console.log('🌐 IP:', request.ip || 'Неизвестно')
    console.log('')
    console.log('💻 Опыт разработки:')
    console.log(formData.experience)
    console.log('')
    console.log('🚀 Описание проекта:')
    console.log(formData.projectDescription)
    console.log('')
    if (formData.goals) {
      console.log('🎯 Цели и задачи:')
      console.log(formData.goals)
      console.log('')
    }
    if (formData.timeline) {
      console.log('⏱️ Временные рамки:')
      console.log(formData.timeline)
      console.log('')
    }
    console.log('=====================================')
    console.log('📧 Отправить ответ на:', formData.email)

    // В реальном проекте здесь бы была отправка email
    // await sendEmailToMagistrTheOne(formData)

    return NextResponse.json({
      success: true,
      message: 'Заявка успешно отправлена'
    })

  } catch (error: any) {
    console.error('Error processing access request:', error)
    return NextResponse.json(
      {
        error: 'Ошибка обработки заявки',
        message: 'Произошла ошибка при обработке заявки. Попробуйте еще раз.'
      },
      { status: 500 }
    )
  }
}
