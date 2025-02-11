player.onChat("run", function () {
    blocks.fill(
    PLANKS_OAK,
    pos(3, -1, 0),
    pos(23, -1, 20),
    FillOperation.Replace
    )
    // budowanie i dekorowanie wiez
    build_tower(3, 0)
    decorate_tower(3, 0)
    build_tower(19, 0)
    decorate_tower(19, 0)
    build_tower(3, 16)
    decorate_tower(3, 16)
    build_tower(19, 16)
    decorate_tower(19, 16)
    // budowanie murow
    build_wall(8, 1, 18, 1, "horizontal")
    build_wall(8, 17, 18, 17, "horizontal")
    build_wall(4, 5, 4, 15, "vertical")
    build_wall(20, 5, 20, 15, "vertical")
    // dekorowanie murow
    decorate_wall(8, 1, 18, 1, "horizontal")
    decorate_wall(8, 17, 18, 17, "horizontal")
    decorate_wall(4, 5, 4, 15, "vertical")
    decorate_wall(20, 5, 20, 15, "vertical")
    // budowanie okien
    add_windows_to_wall(8, 1, 18, 1, "horizontal")
    add_windows_to_wall(8, 17, 18, 17, "horizontal")
    add_windows_to_wall(4, 5, 4, 15, "vertical")
    add_windows_to_wall(20, 5, 20, 15, "vertical")
    // budowanie bramy
    build_gate(11, 0)
    // otwor na przejscie przez brame
    clear_wall_for_gate(11, 1)
    clear_wall_for_gate(11, 2)
    clear_wall_for_gate(11, 3)
    // budownaie fosy
    build_moat(3, 0, 23, 20, 3, 4)
    // budowanie mostu i sciezki
    path(12, -14)
    bridge(12, -14)
})
function build_tower (x: number, z: number) {
    blocks.fill(
    MOSSY_STONE_BRICKS,
    pos(x, 0, z),
    pos(x + 4, 11, z + 4),
    FillOperation.Hollow
    )
}
function decorate_tower (x: number, z: number) {
    let y5 = 12
    for (let k = 0; k <= 4; k++) {
        if (k % 2 == 0) {
            blocks.place(MOSSY_STONE_BRICKS, pos(x + k, y5, z))
        }
        if (k % 2 == 0) {
            blocks.place(MOSSY_STONE_BRICKS, pos(x + k, y5, z + 4))
        }
        if (k % 2 == 0) {
            blocks.place(MOSSY_STONE_BRICKS, pos(x, y5, z + k))
        }
        if (k % 2 == 0) {
            blocks.place(MOSSY_STONE_BRICKS, pos(x + 4, y5, z + k))
        }
    }
}
function add_windows_to_wall (x1: number, z1: number, x2: number, z2: number, orientation: string) {
    // Wysokość okna
    let windowHeight = 6
    if (orientation == "horizontal") {
        // Długość ściany
        let length3 = Math.abs(x2 - x1) + 1
        // Odstęp między oknami
        let step = Math.floor((length3 - 2) / 4)
        for (let i = 0; i <= 3; i++) {
            // Pozycja okna
            let windowX = x1 + 2 + i * step
            for (let l = 0; l <= 2; l++) {
                // Przebijanie muru na szerokość
                // Szkło w murze
                blocks.place(GLASS, pos(windowX, windowHeight, z1 + l))
            }
        }
    } else if (orientation == "vertical") {
        // Długość ściany
        let length4 = Math.abs(z2 - z1) + 1
        // Odstęp między oknami
        let step2 = Math.floor((length4 - 2) / 4)
        for (let m = 0; m <= 3; m++) {
            // Pozycja okna
            let windowZ = z1 + 2 + m * step2
            for (let n = 0; n <= 2; n++) {
                // Przebijanie muru na szerokość
                // Szkło w murze
                blocks.place(GLASS, pos(x1 + n, windowHeight, windowZ))
            }
        }
    }
}
function clear_wall_for_gate(x: number, z: number) {
    for (let y4 = 0; y4 <= 3; y4++) {
        for (let j = 0; j <= 2; j++) {
            blocks.place(AIR, pos(x + 1 + j, y4, z))
        }
    }
}
function build_moat(x1: number, z1: number, x2: number, z2: number, width: number, offset: number) {
    // Obliczenie granic fosy na podstawie zamku
    let outerX1 = x1 - offset - width
    let outerZ1 = z1 - offset - width
    let outerX2 = x2 + offset + width
    let outerZ2 = z2 + offset + width
    // Wyżłobienie fosy (poziom -1 i -2)
    // Górna krawędź
    blocks.fill(
        AIR,
        pos(outerX1, -2, outerZ1 - 4),
        pos(outerX2, -1, outerZ1 + width - 5),
        FillOperation.Replace
    )
    // Dolna krawędź
    blocks.fill(
        AIR,
        pos(outerX1, -2, outerZ2 - width + 1),
        pos(outerX2, -1, outerZ2),
        FillOperation.Replace
    )
    // Lewa krawędź
    blocks.fill(
        AIR,
        pos(outerX1, -2, outerZ1 - 4),
        pos(outerX1 + width - 1, -1, outerZ2),
        FillOperation.Replace
    )
    // Prawa krawędź
    blocks.fill(
        AIR,
        pos(outerX2 - width + 1, -2, outerZ1 - 4),
        pos(outerX2, -1, outerZ2),
        FillOperation.Replace
    )
    // Wypełnienie wodą
    // Górna krawędź
    blocks.fill(
        WATER,
        pos(outerX1, -2, outerZ1 - 4),
        pos(outerX2, -2, outerZ1 + width - 5),
        FillOperation.Replace
    )
    // Dolna krawędź
    blocks.fill(
        WATER,
        pos(outerX1, -2, outerZ2 - width + 1),
        pos(outerX2, -2, outerZ2),
        FillOperation.Replace
    )
    // Lewa krawędź
    blocks.fill(
        WATER,
        pos(outerX1, -2, outerZ1 - 4),
        pos(outerX1 + width - 1, -2, outerZ2),
        FillOperation.Replace
    )
    // Prawa krawędź
    blocks.fill(
        WATER,
        pos(outerX2 - width + 1, -2, outerZ1 - 4),
        pos(outerX2, -2, outerZ2),
        FillOperation.Replace
    )
}
function decorate_wall(x1: number, z1: number, x2: number, z2: number, orientation: string) {
    // Wysokość krenelażu
    let height = 9
    if (orientation == "horizontal") {
        for (let x = x1; x <= x2; x++) {
            if ((x - x1) % 2 === 0) { // Co drugi blok
                blocks.place(STONE_BRICKS, pos(x, height, z1)); // Przednia krawędź
                blocks.place(STONE_BRICKS, pos(x, height, z1 + 2)); // Tylna krawędź
            }
        }
    } else if (orientation == "vertical") {
        for (let z = z1; z <= z2; z++) {
            if ((z - z1) % 2 === 0) { // Co drugi blok
                blocks.place(STONE_BRICKS, pos(x1, height, z)); // Lewa krawędź
                blocks.place(STONE_BRICKS, pos(x1 + 2, height, z)); // Prawa krawędź
            }
        }
    }
}
function path(x: number, z: number) {
    // Pierwsza część ścieżki (4 bloki długości, 3 bloki szerokości)
    blocks.fill(
        GRAVEL,
        pos(x, -1, z - 3),
        pos(x + 2, -1, z + 2),
        FillOperation.Replace
    )
    // Druga część ścieżki (3 bloki długości, 3 bloki szerokości)
    blocks.fill(
        GRAVEL,
        pos(x, -1, z + 6),
        pos(x + 2, -1, z + 13),
        FillOperation.Replace
    )
}
function bridge (x: number, z: number) {
    blocks.fill(
    DARK_OAK_WOOD_SLAB,
    pos(x, 0, z + 1),
    pos(x + 2, 0, z + 1),
    FillOperation.Replace
    )
    blocks.fill(
    DARK_OAK_WOOD_SLAB,
    pos(x, 0, z + 7),
    pos(x + 2, 0, z + 7),
    FillOperation.Replace
    )
    blocks.fill(
    PLANKS_DARK_OAK,
    pos(x, 0, z + 6),
    pos(x + 2, 0, z + 6),
    FillOperation.Replace
    )
    blocks.fill(
    PLANKS_DARK_OAK,
    pos(x, 0, z + 2),
    pos(x + 2, 0, z + 2),
    FillOperation.Replace
    )
    blocks.fill(
    DARK_OAK_WOOD_SLAB,
    pos(x, 0.5, z + 3),
    pos(x + 2, 0.5, z + 5),
    FillOperation.Replace
    )
}
function build_wall (x1: number, z1: number, x2: number, z2: number, orientation: string) {
    if (orientation == "horizontal") {
        for (let y = 0; y <= 8; y++) {
            blocks.fill(
            STONE_BRICKS,
            pos(x1, y, z1),
            pos(x2, y, z1 + 2),
            FillOperation.Replace
            )
        }
    } else if (orientation == "vertical") {
        for (let y2 = 0; y2 <= 8; y2++) {
            blocks.fill(
            STONE_BRICKS,
            pos(x1, y2, z1),
            pos(x1 + 2, y2, z2),
            FillOperation.Replace
            )
        }
    }
}
function build_gate (x: number, z: number) {
    // kolumny
    for (let y3 = 0; y3 <= 2; y3++) {
        blocks.place(MOSSY_STONE_BRICKS, pos(x, y3, z))
        blocks.place(MOSSY_STONE_BRICKS, pos(x + 4, y3, z))
    }
    for (let o = 1; o <= 3; o++) {
        blocks.place(TUFF_BRICKS, pos(x + o, 3, z))
    }
// dekoracje na gorze
    blocks.place(POLISHED_TUFF_SLAB, pos(x, 3, z))
    blocks.place(POLISHED_TUFF_SLAB, pos(x + 4, 3, z))
    blocks.place(POLISHED_TUFF_SLAB, pos(x + 2, 4, z))
    // pochodnia
    blocks.place(TORCH, pos(x + 2, 3, z - 1))
    // wypelnienie plotem
    blocks.fill(
    DARK_OAK_FENCE,
    pos(x + 1, 2, z),
    pos(x + 3, 2, z),
    FillOperation.Replace
    )
}
