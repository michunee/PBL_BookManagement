-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 20, 2021 lúc 07:30 AM
-- Phiên bản máy phục vụ: 10.4.21-MariaDB
-- Phiên bản PHP: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `dulieutiemsach1`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `catalog`
--

CREATE TABLE `catalog` (
  `idCat` int(11) NOT NULL,
  `nameCat` varchar(50) NOT NULL,
  `number` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `catalog`
--

INSERT INTO `catalog` (`idCat`, `nameCat`, `number`) VALUES
(3, 'Trinh thám', 0),
(4, 'Khoa học viễn tưởng', 0),
(5, 'Cổ tích, thiếu nhi', 0),
(6, 'Giáo khoa, kiến thức', 0),
(7, 'Tiểu sử, tự truyện', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comment`
--

CREATE TABLE `comment` (
  `idComment` int(11) NOT NULL,
  `content` varchar(255) NOT NULL,
  `ten` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `date` datetime NOT NULL,
  `rating` int(11) NOT NULL,
  `idProduct` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `comment`
--

INSERT INTO `comment` (`idComment`, `content`, `ten`, `email`, `date`, `rating`, `idProduct`) VALUES
(1, 'Sách hay quá', 'Miserchu', 'khoicari69@gmail.com', '2021-11-15 10:20:50', 5, 17),
(3, 'Sách như loz', 'Công Anh', 'khoicari69@gmail.com', '2021-11-15 17:02:12', 1, 17),
(4, 'Sách tàm tạm', 'Quy Vu Dinh', 'khoicari69@gmail.com', '2021-11-15 17:04:51', 3, 17);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `idProduct` int(11) NOT NULL,
  `nameProduct` varchar(50) NOT NULL,
  `authorProduct` varchar(50) NOT NULL,
  `amountProduct` int(11) NOT NULL,
  `imgProduct` varchar(250) NOT NULL,
  `priceProduct` double NOT NULL,
  `desProduct` varchar(4000) NOT NULL,
  `idCat` int(11) NOT NULL,
  `showHide` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`idProduct`, `nameProduct`, `authorProduct`, `amountProduct`, `imgProduct`, `priceProduct`, `desProduct`, `idCat`, `showHide`) VALUES
(1, 'Thất Tịch Không Mưa', 'Lâu Vũ Tinh', 10, 'img/that-tich-khong-mua.jpg', 63000, 'Từ nhỏ cô đã thầm yêu anh, như số kiếp không thể thay đổi Tình yêu trong sáng ấy, như lần đầu được nếm mùi vị của quả khế mới chín. Sau đó cô và anh xa nhau, gặp lại đều cách nhau ba năm.\r\n\r\nTình yêu, giống như lần đầu được nếm thử quả khế mới chín.\r\n\r\nChua chua, chát chát, nhưng không kìm được, vẫn muốn nếm thêm lần nữa.\r\n\r\nTrong quả khế chát xanh xanh, nụ cười ngốc nghếch, ngọt ngào của anh, tình đầu thơ ngây, trong sáng của em lặng lẽ nảy mầm.', 1, 1),
(2, 'Call Me By Your Name', 'André Aciman', 10, 'img/call-me-by-your-name.jpg', 100000, 'Gọi em bằng tên anh là câu chuyện tình yêu bất ngờ và mạnh mẽ nảy nở giữa thiếu niên 17 tuổi tên Elio với Oliver, một học giả Mỹ là khách trọ mùa hè ở căn biệt thự của ba mẹ Elio tại vùng duyên hải Riviera nước Ý thập niên 1980. Trong những tuần mùa hè sôi động ấy, dòng chảy cuồn cuộn ám ảnh và đam mê bị kìm nén càng làm mãnh liệt thêm tình yêu giữa hai chàng trai trẻ. Cuốn tiểu thuyết đầu tay của André Aciman là một khúc bi ca chân thành và cảm động dành cho tình yêu con người. Một cuốn sách không thể nào quên.', 1, 1),
(3, 'Tam Sinh Tam Thế - Thập Lý Đào Hoa', 'Đường Thất Công Tử', 10, 'img/tam-sinh-tam-the.jpg', 140000, 'Một người thà say mèm trong rừng đào mười dặm để quên hết quá khứ, một người nặng tình ba đời ba kiếp mòn mỏi đợi chờ.\r\n\r\nBóng hình bắt gặp đó, như đúng như sai. Những chuyện cũ đã quên đó, như hư như thực.\r\n\r\nMười dặm hoa đào chiếu rạng đôi mắt bi thương, nhưng chẳng thể nào quên đi được giây phút trông thấy gương mặt nàng trong quá khứ.\r\n\r\nQuá khứ, hiện tại, tương lai - ba kiếp nhân duyên của Dạ Hoa và Bạch Thiển, giữa mười dặm hoa đào mênh mông thắm sắc, từ nay chỉ còn hạnh phúc ngập tràn.\"', 1, 1),
(4, 'Romeo và Juliet', 'Willliam Shakespeare', 10, 'img/romeo-and-juliet.jpg', 120000, 'his major new edition of Shakespeare\'s greatest tragedy of love argues that that play is ultimately Juliet\'s. The play text is expertly edited and the on-page commentary notes discuss issues of staging, theme, meaning and Shakespeare\'s use of his sources to give the reader deep and engaging insights into the play. The richly illustrated introduction looks at the play\'s exceptionally beautiful and complex language and focuses on the figure of Juliet as being at its centre. Rene Weis discusses the play\'s critical, stage and film history, including West Side Story and Baz Luhrmann\'s seminal film Romeo + Juliet. This is an authoritative edition from a leading scholar, giving the reader a penetrating and wide-ranging insight into this ever popular play.', 1, 1),
(5, 'Cuốn Theo Chiều Gió', 'Margaret Mitchell', 10, 'img/cuon-theo-chieu-gio.jpg', 141000, 'Cuốn theo chiều gió là cuốn tiểu thuyết duy nhất của nữ tác giả Margaret Mitchell, ngay từ khi mới ra đời, năm 1936, tác phẩm văn học này đã mau chóng chiếm được tình cảm của người dân Mỹ cũng như chinh phục trái tim của hàng triệu độc giả trên khắp thế giới.\r\n\r\nLấy bối cảnh từ cuộc nội chiến vô cùng khốc liệt giữa Bắc và Nam Mỹ, Cuốn Theo Chiều Gió với cốt truyện rõ ràng, logic, dễ hiểu, đã khắc họa một cách tài tình tâm trạng, tính cách và thân phận của nhiều lớp người trong chiến tranh và thời hậu chiến.\r\n\r\nNhân vật chính của tiểu thuyết là cô gái Scarlett O\'hara cùng với Rhett Butler trở thành cặp nhân vật điển hình, thuộc loại thành công nhất trong văn học Hoa Kỳ. Cuốn Theo Chiều Gió có sức hấp dẫn mãnh liệt giới trẻ Mỹ cũng như thanh niên toàn thế giới vì đây là cuốn tiểu thuyết tình yêu đặc sắc. Lạ kỳ thay, trong chiến tranh và những năm hậu chiến vô cùng gian khổ, tình yêu lại luôn luôn chói ngời, trở thành động lực giúp cho con người vượt qua chết chóc, đói khổ và sự hèn hạ. Không chỉ có tình yêu trai gái, Cuốn Theo Chiều Gió còn là bài ca của tình yêu quê hương đất nước, tình tương thân tương ái.\r\n\r\nBa năm sau khi tiểu thuyết Cuốn Theo Chiều Gió ra đời, bộ phim cùng tên dựng theo tác phẩm của Margaret Mitchell được công chiếu đã trở thành sự kiện lớn, thành niềm tự hào của điện ảnh Mỹ.', 1, 1),
(6, 'Yêu Em Từ Cái Nhìn Đầu Tiên', 'Cố Mạn', 10, 'img/yeu-em-tu-cai-nhin-dau-tien.jpg', 101000, 'Nhắc đến Yêu em từ cái nhìn đầu tiên có lẽ không cần dùng quá nhiều lời, bởi cùng với Sam Sam đến đây ăn nào, Bên nhau trọn đời, Yêu em từ cái nhìn đầu tiên đã làm nên tên tuổi của Cố Mạn tại Việt Nam.\r\n\r\nĐi cùng?\r\n\r\nHai chữ này kéo Vy Vy trở về hiện tại, lập tức hoàn hồn.Nhìn chiếc xe, lại nhìn Đại Thần, người đẹp Vy Vy lắp bắp:\r\n\r\n“Em… em…”\r\n\r\nTiêu Nại hơi cau mày. Vy Vy trấn tĩnh nói:\r\n\r\n“… Anh đèo em?”.\r\n\r\n“Ừ, đường xa thế chẳng lẽ đi bộ?”.\r\n\r\nĐường đến nhà thi đấu bóng rổ xa thế, đi bộ đương nhiên rất đáng sợ, nhưng… nhưng  đáng sợ hơn chính là anh đèo em! Vy Vy băn khoăn. Với danh tiếng nổi như cồn của Tiêu Nại, cộng thêm chút nổi tiếng nho nhỏ của Vy Vy, đèo nhau trên con đường này, chắc chắn sẽ có ngay những lời đồn hay ho cho coi! Tuy rằng họ hình như, hình như, có vẻ như đúng là đang tiến tới những nghi ngờ hay ho đó, nhưng hiện nay, bây giờ, lúc này họ tuyệt đối trắng tinh hơn cả lông cừu.\r\n\r\n“Như thế này... như thế này... không ổn lắm. Người khác nhìn thấy sẽ hiểu nhầm”.\r\n\r\nVy Vy cố từ chối khéo, hai tai bắt đầu đỏ dần.\r\n\r\n“Hiểu nhầm?”.\r\n\r\nChẳng lẽ anh không hiểu? Vy Vy đành nói thẳng:\r\n\r\n“Hiểu nhầm chúng ta… ôi, là kiểu quan hệ đó…”.\r\n\r\nTiêu Nại lặng lẽ nhìn cô, hồi lâu không nói, Vy Vy cảm thấy một nỗi căng thẳng khó hiểu… mình không nói gì sai chứ? Đúng khi Vy Vy cảm thấy mỗi lúc càng căng thẳng hơn, cuối cùng Nại Hà phá vỡ bầu không khí yên lặng:\r\n\r\n“Thế chúng ta không phải là kiểu quan hệ đó từ khi nào vậy?”.\r\n\r\nYêu em từ cái nhìn đầu tiên từ khi phát hành cho đến nay đã nhận được vô vàn lời khen tặng của độc giả:\r\n\r\n\"Văn chương của Cố Mạn lãng mạn, dịu dàng, khiến người đọc có cảm giác như đang trôi bồng bềnh trong mơ, vừa đọc vừa vén môi cười dịu dàng… Giồng như khi đối diện với mặt nước hồ phẳng lặng, Cố Mạn sẽ rải lên đó một vài cánh hoa hồng…\"\r\n\r\n(Độc giả Bluehopeatm)\r\n\r\n\"Thế giới của Yêu em từ cái nhìn đầu tiên là thế giới màu hồng dịu ngọt… Tuy không thực tế nhưng vẫn khiến ta phải mỉm cười, phải yêu mến.Độc giả Linh_SuriYêu em từ cái nhìn đầu tiên là một câu chuyện nhẹ nhàng ấm áp, một câu chuyện tình đẹp đến nỗi ta không dám tin nó có thực.\"\r\n\r\n(Độc giả Khiconkhocnhe_1992)', 1, 1),
(7, 'Ring - Vòng Tròn Ác Nghiệt', 'Suzuki Koji', 10, 'img/ring.jpg', 68000, 'Cái chết đến từ một cuộn băng. Hai đôi nam nữ vị thành niên lần lượt chết bởi cơn đau bóp nghẹt trái tim một tuần sau khi xem phải cuộn băng lạ trong một nhà nghỉ ngoại ô Tokyo, bên trên một cái giếng cũ\r\n\r\nMê mẩn khám phá ra bí ẩn đằng sau những cái chết kinh hoàng đó, Asakawa, một phóng viên đang háo hức vì danh vọng lao vào cuộc truy tìm dấu vết. Đến mức gã tự mình xem phải cuộn băng, và đối mặt với lời đe dọa hãi hùng kẻ nào đó đã đặt trong những hình ảnh cuộn băng ghi lại. Bảy ngày còn lại, vòng quay của Ring bắt đầu, sự khiếp hãi của kẻ đã thấy ngọn núi lửa phun trào, những cái mặt ma quái, và cuối cùng, cái giếng cũ tiêu điều giữa khu rừng vắ bắt đầu ngấm vào trong tim. Sự thật là đâu? Đâu là lời nguyền, đâu là lời giải?\r\n\r\nHãy thưởng thức Ring, vòng tròn ác nghiệt của Koji Suzuki, tác phẩm kinh dị kinh điển đã làm mưa làm gió bằng những thành công khổng lồ ở đất nước Phù Tang trong hàng thập kỷ, trước khi bước lên màn ảnh với hai bộ phim nổi tiếng Ringu của Nhật Bản và The ring của Holywood. Xuất khẩu nỗi sợ đặc trưng Nhật Bản ra toàn thế giới, Ring thỏa mãn những ai đang tìm kiếm khoái cảm trong nỗi rùng mình, cùng những triết lý cao sang và sâu sắc của một trong những kiệt tác của thể loại.', 2, 1),
(8, 'IT', 'Stephen King', 10, 'img/it.jpg', 340000, 'NOW A MAJOR MOTION PICTURE - Stephen King\'s terrifying classic.\r\n\r\n\'They when you\'re down here with me, you\'ll float, too.\'\r\n\r\nDerry, Maine is just an ordinary town: familiar, well-ordered for the most part, a good place to live.\r\n\r\nIt is a group of children who see - and feel - what makes Derry so horribly different. In the storm drains, in the sewers, IT lurks, taking on the shape of every nightmare, each one\'s deepest dread. Sometimes is appears as an evil clown named Pennywise and sometimes IT reaches up, seizing, tearing, killing . . .\r\n\r\nTime passes and the children grow up, move away and forget. Until they are called back, once more to confront IT as IT stirs and coils in the sullen depths of their memories, emerging again to make their past nightmares a terrible present reality.', 2, 1),
(9, 'Sự Im Lặng Của Bầy Cừu', 'Thomas Harris', 10, 'img/su-im-lang-cua-bay-cuu.jpg', 86000, 'Những cuộc phỏng vấn ở xà lim với kẻ ăn thịt người ham thích trò đùa trí tuệ, những tiết lộ nửa chừng hắn chỉ dành cho kẻ nào thông minh, những cái nhìn xuyên thấu thân phận và suy tư của cô mà đôi khi cô muốn lảng trá Clarice Starling đã dấn thân vào cuộc điều tra án giết người lột da hàng loạt như thế, để rồi trong tiếng bức bối của chiếc đồng hồ đếm ngược về cái chết, cô phải vật lộn để chấm dứt tiếng kêu bao lâu nay vẫn đeo đẳng giấc mơ mình: tiếng kêu của bầy cừu sắp bị đem đi giết thịt.\r\n\r\nSự im lặng của bầy cừu hội tụ đầy đủ những yếu tố làm nên một cuốn tiểu thuyết trinh thám kinh dị xuất sắc nhất: không một dấu vết lúng túng trong những chi tiết thuộc lĩnh vực chuyên môn, với các tình tiết giật gân, cái chết luôn lơ lửng, với cuộc so găng của những bộ óc lớn mà không có chỗ cho kẻ ngu ngốc để cuộc chơi trí tuệ trở nên dễ dàng. Bồi đắp vào cốt truyện lôi cuốn đó là cơ hội được trải nghiệm trong trí não của cả kẻ gây tội lẫn kẻ thi hành công lý, khi mỗi bên phải vật vã trong ngục tù của đau đớn để tìm kiếm, khẩn thiết và liên tục, một sự lắng dịu cho tâm hồn.', 2, 1),
(10, 'Bá Tước Dracula', 'Bram Stocker', 10, 'img/ba-tuoc-dracula.jpg', 84000, 'Bá Tước Dracula là một cuốn tiểu thuyết kinh dị gothic năm 1897 của tác giả người Ireland Bram Stoker , nổi tiếng với nhân vật ma cà rồng bá tước Dracula .\r\n\r\nCuốn tiểu thuyết kể về hành trình từ Transylva-nia đến Anh để săn lùng những con mồi mới và gieo rắc lời nguyền của Dracula và cuộc chiến giữa hắn và nhóm giáo sư Abraham Van Helsing .\r\n\r\nCuốn tiểu thuyết đề cao vai trò của phụ nữ trong văn hoá Victoria, chủ nghĩa thực dân và chủ nghĩa hậu thực dân . Mặc dù không sáng tạo ra ma cà rồng , nhưng tác phẩm của Stoker đã định ra hình thức hiện đại của nó và tạo ra nhiều diễn giải được áp dụng trong sân khấu , phim ảnh và truyền hình sau này .', 2, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `idUser` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `ho` varchar(50) NOT NULL,
  `ten` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`idUser`, `username`, `password`, `email`, `ho`, `ten`, `phone`, `address`) VALUES
(1, 'michu', '1', 'khoicari69@gmail.com', 'Nguyễn', 'Khôi', '0902188341', 'Đà Nẵng'),
(2, 'Khoivuong', '1234', 'khoicari69@gmail.com', 'Nguyễn', 'Khôi', '0902188341', 'Da Nang'),
(3, 'phuongcute', '1234567', 'phuongngok@gmail.com', 'Trần', 'Phương', '0902188341', 'Hải Châu'),
(4, 'longbeo', '1234', 'longbeo@gmail.com', 'Nguyễn', 'Long', '0902188341', 'Hải Châu'),
(5, 'bebi', '1', 'khoicari69@gmail.com', 'Trần', 'Hải', '0902188341', 'Hải Châu'),
(6, 'longdt1', '123', 'longduong@gmail.com', 'Dương Phước', 'Long', '231231231', 'Đà Nẵng'),
(7, 'mimi', '123456', 'khoicari69@gmail.com', 'Trần', 'Mi', '2342343242', 'Hải Châu'),
(9, 'anhtuyet', 'anhtuyet', 'khoicari69@gmail.com', 'Chu', 'Mi', '0902188341', 'Hải Châu');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `catalog`
--
ALTER TABLE `catalog`
  ADD PRIMARY KEY (`idCat`);

--
-- Chỉ mục cho bảng `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`idComment`),
  ADD KEY `fk_idProduct` (`idProduct`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`idProduct`),
  ADD KEY `fk_idCat` (`idCat`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `catalog`
--
ALTER TABLE `catalog`
  MODIFY `idCat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `comment`
--
ALTER TABLE `comment`
  MODIFY `idComment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `idProduct` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
