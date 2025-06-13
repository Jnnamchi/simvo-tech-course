export class PathBuilder {
  private commands: string[] = []
  private x: number
  private y: number
  private containerWidth: number
  private containerHeight: number
  private scale: number

  constructor(
    containerWidth: number,
    containerHeight: number,
    startX: number,
    startY: number,
    scale: number
  ) {
    this.containerWidth = containerWidth
    this.containerHeight = containerHeight
    this.scale = scale

    this.x = startX
    this.y = startY
    this.commands.push(`M ${this.x} ${this.y}`)
  }

  private toDx(dx: number): number {
    return (this.containerWidth * dx) / this.scale
  }

  private toDy(dy: number): number {
    return (this.containerHeight * dy) / this.scale
  }

  right(dx: number) {
    return this.diag(dx, 0)
  }

  left(dx: number) {
    return this.diag(-dx, 0)
  }

  up(dy: number) {
    return this.diag(0, dy)
  }

  down(dy: number) {
    return this.diag(0, -dy)
  }

  diag(dx: number, dy: number) {
    this.x += this.toDx(dx)
    this.y -= this.toDy(dy) // flip Y-axis for intuitive up/down
    this.commands.push(`L ${this.x} ${this.y}`)
    return this
  }

  skip(dx: number, dy: number) {
    this.x += this.toDx(dx)
    this.y -= this.toDy(dy) // same Y inversion
    this.commands.push(`M ${this.x} ${this.y}`)
    return this
  }

  close() {
    this.commands.push('Z')
    return this
  }

  build(): string {
    return this.commands.join(' ')
  }
}
